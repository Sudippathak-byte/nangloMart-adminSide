import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { deleteOrder, fetchOrders } from "../Store/dataSlice";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../Types/dataTypes";

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteOrder(id));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 mb-10 shadow-default sm:px-7.5 pb-10">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-extrabold text-black">Orders List:</h4>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="min-w-[220px] text-center py-4 px-4 font-medium text-black xl:pl-11">
                ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black">
                Phone Number
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                Shipping Address
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                Payment Method
              </th>

              <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                Payment Status
              </th>

              <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                Order Status
              </th>
              <th className="py-4 px-4 font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black">
                      <Link to={`/order/${order.id}`}>{order.id}</Link>
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p className="text-black text-sm">{order.phoneNumber}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p className="text-black">{order.shippingAddress}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p
                      className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                        order.Payment.paymentMethod === PaymentMethod.COD
                          ? "bg-green-200 text-green-600"
                          : "bg-purple-200 text-purple-600"
                      }`}
                    >
                      {order.Payment.paymentMethod}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p
                      className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                        order.Payment.paymentStatus === PaymentStatus.Paid
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {order.Payment.paymentStatus}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4">
                    <p
                      className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                        order.orderStatus === OrderStatus.Delivered
                          ? "bg-green-200 text-green-600"
                          : order.orderStatus === OrderStatus.Cancel
                          ? "bg-red-200 text-red-600"
                          : "bg-yellow-200 text-yellow-600"
                      }`}
                    >
                      {order.orderStatus}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/order/${order.id}`}
                        className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-700"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {(!orders || orders.length === 0) && (
        <div className="flex justify-center p-5">
          <p className="text-center text-gray-500">No order found.</p>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
