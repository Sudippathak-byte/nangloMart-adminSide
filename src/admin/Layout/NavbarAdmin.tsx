import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Store/hooks";
import { resetStatus, setUserLogout } from "../Store/AuthSlice";
import { FaRegUser } from "react-icons/fa";

const NavbarAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
    dispatch(setUserLogout());
    dispatch(resetStatus());
  };

  const name = localStorage.getItem("User");

  return (
    <nav className="fixed w-full bg-gradient-to-r from-red-600 via-green-500 to-red-600 shadow-lg z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/dashboard"
              className="group flex items-center space-x-2 text-xl md:text-2xl font-bold"
            >
              <span className="text-green-300 font-serif tracking-wider transition-colors duration-300 group-hover:text-green-400">
                Nanglo
              </span>
              <span className="text-yellow-300 font-serif tracking-wider">
                Mart
              </span>
            </Link>
          </div>

          {name && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white/90 hover:text-yellow-200 transition-colors duration-200">
                <div className="bg-red-500/80 rounded-full p-2">
                  <FaRegUser className="w-5 h-5" />
                </div>
                <span className="font-medium capitalize hidden sm:inline">
                  {name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-900 text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-600"
              >
                <MdLogout className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;