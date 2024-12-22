import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { deleteProduct, fetchProducts } from "../Store/dataSlice";

interface ProductTableProps {
  onSubmit: (product: any) => void;
}
const ProductTable = ({ onSubmit }: ProductTableProps) => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-2 mt-8 mb-10 shadow-default sm:px-7.5 pb-10">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black">Product list:</h4>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="min-w-[220px] text-center py-4 px-4 font-medium text-black xl:pl-11">
                  Product Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                  Category Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                  Price
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                  Stocks
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                  Created_at
                </th>

                <th className="py-4 px-4 font-medium text-black ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 object-contain">
                      <img
                        className="h-[200px] w-[250px] object-contain"
                        src={product?.productImageUrl}
                        alt={product?.productName}
                      />
                      <h1 className="font-bold">{product?.productName}</h1>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      {product?.Category?.categoryName}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      Rs.{product?.productPrice}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      {product?.productTotalStockQty}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      {product?.createdAt}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => {
                            onSubmit(product);
                            window.scrollTo(0, 0);
                          }}
                          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product?.id as string)}
                          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {(!products || products.length === 0) && (
          <div className="flex justify-center p-5">
            <p className="text-center text-gray-500">No Products found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductTable;
