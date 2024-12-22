import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { deleteUser, fetchUsers, updateUserDetails } from "../Store/dataSlice";

const UserTable = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.data);

  const [editingUser, setEditingUser] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
    dispatch(fetchUsers());
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    dispatch(fetchUsers());
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditingUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      const updatedUser = { ...editingUser };
      let id = editingUser.id;
      await dispatch(updateUserDetails(id, updatedUser));
      setEditingUser(null);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 mb-10 shadow-default sm:px-7.5 pb-10">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-extrabold text-black">Users List:</h4>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="min-w-[220px] text-center py-4 px-4 font-medium text-black xl:pl-11">
                  UserID
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black">
                  UserName
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                  Role
                </th>
                <th className="py-4 px-4 font-medium text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                      <p className="font-medium text-black">{user.id}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black">{user.username}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black">{user.email}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p
                        className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-green-200 text-green-600"
                            : "bg-yellow-200 text-yellow-600"
                        }`}
                      >
                        {user.role}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => handleEdit(user)} // Open the edit form with the current user data
                          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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
      </div>

      {(!users || users.length === 0) && (
        <div className="flex justify-center p-5">
          <p className="text-center text-gray-500">No users found.</p>
        </div>
      )}

      {/* Conditionally render Update User form as modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update User</h2>
            {/* Move the onSubmit here to the form element */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password (Optional)
                </label>
                <input
                  type="password"
                  name="password"
                  // value={editingUser.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="customer">customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-b from-[#33d058] to-[#115c23] text-white rounded-lg "
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
