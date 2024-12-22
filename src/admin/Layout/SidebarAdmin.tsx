import { useEffect, useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../Store/hooks";
import { fetchOrders, fetchProducts, fetchUsers } from "../Store/dataSlice";
import { AiFillProduct } from "react-icons/ai";
import { FaShoppingCart, FaUsers } from "react-icons/fa";

const SidebarAdmin = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, []);

  const navLinkStyles = ({ isActive }) =>
    `flex items-center p-3 rounded-xl transition-all duration-300 
    ${isActive 
      ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
      : 'hover:bg-red-600 text-white hover:shadow-md hover:shadow-red-600/20'
    }`;

  return (
    <aside
      id="sidebar"
      className={`fixed left-0 top-16 h-[90vh] bg-gradient-to-b from-green-700 via-red-600 to-green-700
        py-6 transition-all duration-500 ease-in-out ${isExpanded ? "w-80" : "w-20"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="px-4 h-full flex flex-col justify-between">
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/user-details"
              className={navLinkStyles}
            >
              <FaUsers className="w-6 h-6" />
              {isExpanded && (
                <span className="ml-4 text-lg font-semibold">
                  User Details
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/product-details"
              className={navLinkStyles}
            >
              <AiFillProduct className="w-6 h-6" />
              {isExpanded && (
                <span className="ml-4 text-lg font-semibold">
                  Product Details
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category-details"
              className={navLinkStyles}
            >
              <TbCategoryPlus className="w-6 h-6" />
              {isExpanded && (
                <span className="ml-4 text-lg font-semibold">
                  Category Details
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/order-details"
              className={navLinkStyles}
            >
              <FaShoppingCart className="w-6 h-6" />
              {isExpanded && (
                <span className="ml-4 text-lg font-semibold">
                  Order Details
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarAdmin;