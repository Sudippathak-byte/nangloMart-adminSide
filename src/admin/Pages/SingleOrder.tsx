import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  handleOrderStatusById,
  singleOrder,
  updatePaymentStatus,
} from "../Store/dataSlice";
import { socket } from "../../App";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../Types/dataTypes";
import toast from "react-hot-toast";
import NavbarAdmin from "../Layout/NavbarAdmin";

const SingleOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    singleOrder: [order],
  } = useAppSelector((state) => state.data);
  const [, setOrderStatus] = useState("");
  const [, setPaymentStatus] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(singleOrder(id));
    }
  }, [dispatch, id]);

  const handleOrderStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(e.target.value as OrderStatus);
    if (id) {
      socket.emit("updatedOrderStatus", {
        status: e.target.value,
        orderId: id,
        userId: order.Order.userId,
      });
      try {
        await dispatch(
          handleOrderStatusById(e.target.value as OrderStatus, id)
        );
        navigate("/order-details");
      } catch (error: any) {
        toast.error(error);
      }
    }
  };
  const handlePaymentStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newPaymentStatus = e.target.value as PaymentStatus;
    setPaymentStatus(newPaymentStatus);

    if (id && order?.Order?.userId) {
      socket.emit("updatedPaymentStatus", {
        paymentStatus: newPaymentStatus,
        orderId: id,
        userId: order.Order.userId,
      });

      try {
        await dispatch(
          updatePaymentStatus({ orderId: id, paymentStatus: newPaymentStatus })
        );
        navigate("/order-details");
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <NavbarAdmin />
        </div>

        <div className="py-12 mt-20 px-6  bg-gray-50">
          <div className="max-w-screen-xl mx-auto space-y-6">
            <div className="flex justify-between items-center space-y-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Order id : {id}
              </h1>
              <p className="text-sm text-gray-500">{order?.createdAt}</p>
            </div>

            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
              <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Product Details
                </h2>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-full md:w-1/3">
                    <img
                      src={order?.Product?.productImageUrl}
                      alt="Product"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Product Name : {order?.Product?.productName}
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                      Product Price : Rs. {order?.Product?.productPrice}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      Quantity: {order?.quantity}
                    </p>
                    {order?.Order?.Payment?.paymentMethod ===
                    PaymentMethod.COD ? (
                      <p className="text-lg font-semibold text-gray-800">
                        Shipping Charge : 100
                      </p>
                    ) : (
                      ""
                    )}
                    <p className="text-xl font-bold text-blue-600">
                      Total: Rs.
                      {order?.Order?.Payment?.paymentMethod ===
                      PaymentMethod.COD
                        ? 100 + order?.Product?.productPrice * order?.quantity
                        : order?.Product?.productPrice * order?.quantity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <p className="font-medium">Payment Method</p>
                    <p>{order?.Order?.Payment?.paymentMethod}</p>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <p className="font-medium">Payment Status</p>
                    <select
                      value={order?.Order?.Payment?.paymentStatus}
                      onChange={handlePaymentStatus}
                      className="bg-blue-50 text-blue-600 border border-blue-300 rounded-lg p-2 w-full"
                    >
                      <option value="unpaid">unpaid</option>
                      <option value="paid">paid</option>
                    </select>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <p className="font-medium">Order Status</p>
                    <select
                      value={order?.Order?.orderStatus}
                      onChange={handleOrderStatus}
                      className="bg-blue-50 text-blue-600 border border-blue-300 rounded-lg p-2 w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="ontheway">On the Way</option>
                      <option value="preparation">Preparation</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Customer Details
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>UserName:</strong> {order?.Order?.User?.username}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {order?.Order?.shippingAddress}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {order?.Order?.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;
