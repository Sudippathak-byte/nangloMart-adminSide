import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { API } from "../../http";
import { useAppDispatch } from "../../Store/hooks";
import {
  addProduct,
  updateProductDetails,
  AddProduct,
  UpdateProduct,
} from "../../Store/dataSlice";
import AdminLayout from "../../Layout/AdminLayout";
import ProductTable from "../../component/Product";

const ProductDetails = () => {
  interface Category {
    id: string;
    categoryName: string;
  }

  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null); // ref for the image input

  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<AddProduct>({
    productName: "",
    categoryId: "",
    image: null,
    productDescription: "",
    productPrice: 0,
    productTotalStockQty: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch categories on component mount
  const fetchCategories = async () => {
    const response = await API.get("admin/category");
    if (response.status === 200) {
      setCategories(response.data.data);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files?.[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If editing, update the product
    if (editingId) {
      let id = editingId;
      await dispatch(updateProductDetails(id, data));
    } else {
      // If adding a new product, dispatch the addProduct action
      await dispatch(addProduct(data));
    }

    // After dispatching, reset the form
    setData({
      productName: "",
      categoryId: "",
      image: null,
      productDescription: "",
      productPrice: 0,
      productTotalStockQty: 0,
    });
    setEditingId(null); // Reset the editing state

    // Reset the file input
    if (imageInputRef.current) {
      imageInputRef.current.value = ""; // Manually reset the file input
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  const handleEdit = (product: UpdateProduct) => {
    setEditingId(product.id);
    setData({
      productName: product.productName,
      categoryId: product.categoryId,
      image: product.image, // Ensure image is properly loaded
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productTotalStockQty: product.productTotalStockQty,
    });
  };
  console.log(data);
  return (
    <AdminLayout>
      <div className="px-10 py-8 mx-auto max-w-screen-xl">
        <h2 className="mb-4 text-xl font-extrabold text-gray-900">
          {editingId ? "Edit Product" : "Add a New Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                value={data.productName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Smart Watch"
                required
              />
            </div>

            <div>
              <label
                htmlFor="productTotalStockQty"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Total Stock Quantity
              </label>
              <input
                type="number"
                name="productTotalStockQty"
                id="productTotalStockQty"
                value={data.productTotalStockQty}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="5"
                required
              />
            </div>

            <div>
              <label
                htmlFor="productPrice"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Price
              </label>
              <input
                type="number"
                name="productPrice"
                id="productPrice"
                value={data.productPrice}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Rs 2999"
                required
              />
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={data.categoryId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                {categories.length > 0 && (
                  <option value="" disabled hidden>
                    Select a category
                  </option>
                )}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="productDescription"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="productDescription"
                name="productDescription"
                rows={8}
                value={data.productDescription}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="product description here"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                {editingId ? "Image (Optional)" : "Upload Image"}
              </label>

              <input
                type="file"
                name="image"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onChange={handleChange}
                ref={imageInputRef}
              />
            </div>
          </div>
          <button className="w-full p-2 rounded-xl mt-8 font-medium text-white  bg-gradient-to-b from-[#33d058] to-[#115c23] md:p-3">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
      <div>
        <ProductTable onSubmit={handleEdit} />
      </div>
    </AdminLayout>
  );
};

export default ProductDetails;
