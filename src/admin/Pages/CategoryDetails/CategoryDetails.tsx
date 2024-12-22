import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  fetchCaetgories,
  updateCategory,
} from "../../Store/dataSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import AdminLayout from "../../Layout/AdminLayout";

const CategoryDetails = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.data);

  const [data, setData] = useState<{ categoryName: string }>({
    categoryName: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      // Update existing category
      await dispatch(
        updateCategory(editingId, { categoryName: data.categoryName })
      ).then;
      setData({ categoryName: "" });
      setEditingId(null);
    } else {
      // Add new category
      await dispatch(addCategory(data));
      setData({ categoryName: "" });
    }
  };

  useEffect(() => {
    dispatch(fetchCaetgories());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id));
  };

  const handleEdit = (category: { id: string; categoryName: string }) => {
    setData({ categoryName: category.categoryName });
    setEditingId(category.id);
  };

  return (
    <AdminLayout>
      <div className="py-8 px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-xl font-extrabold text-gray-900">
            {editingId ? "Edit Category" : "Add a New Category"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="categoryName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                value={data.categoryName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Electronics"
                required
              />
            </div>
            <button className="w-full p-2 rounded-xl mt-8 font-medium text-white bg-gradient-to-b from-[#33d058] to-[#115c23] md:p-3">
              {editingId ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-2 mt-8 mb-10 shadow-default sm:px-7.5 pb-10">
          <div className="py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black">Category List:</h4>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="min-w-[220px] text-center py-4 px-4 font-medium text-black xl:pl-11">
                    Category ID
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                    Category Name
                  </th>
                  <th className="py-4 px-4 font-medium text-black ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                        <h5 className="font-medium text-black">
                          {category.id}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4">
                        {category.categoryName}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => {
                              handleEdit(category);
                              window.scrollTo(0, 0);
                            }}
                            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
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
          {(!categories || categories.length === 0) && (
            <div className="flex justify-center p-5">
              <p className="text-center text-gray-500">No categories found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryDetails;
