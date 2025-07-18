import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPaw } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { HashLink as Link } from 'react-router-hash-link';
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  const handleLogout =async () => {
    const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`,{},{withCredentials:true})
    console.log(res,"logout")
    dispatch(logout());
    setOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-7xl bg-white/60 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center justify-between">
      <NavLink
        to="/"
        className="text-xl md:text-2xl font-bold text-cyan-600 flex items-center"
      >
        VetTag <FaPaw className="text-black mx-2" />
      </NavLink>

      <div className="hidden md:flex items-center gap-6 font-medium">
        {user ? (
          <>
            <NavLink
              to="/dashboard/mypets"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-semibold transition"
                  : "text-gray-800 hover:text-cyan-600 transition"
              }
            >
              Dashboard
            </NavLink>
            {/* <NavLink
              to="/addpets"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-semibold transition"
                  : "text-gray-800 hover:text-cyan-600 transition"
              }
            >
              Add Pet
            </NavLink> */}
            <NavLink
              to="/lost-pets"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-semibold transition"
                  : "text-gray-800 hover:text-cyan-600 transition"
              }
            >
              Lost Pets
            </NavLink>
            <NavLink
              to="/userProfile"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-semibold transition"
                  : "text-gray-800 hover:text-cyan-600 transition"
              }
            >
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="ml-4 bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link smooth to="/#features"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-semibold transition"
                  : "text-gray-800 hover:text-cyan-600 transition"
              }
            >
              Features
            </Link>
            <Link smooth to="/#howItsWorks"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-semibold transition"
                  : "text-gray-800 hover:text-cyan-600 transition"
              }
            >
              How it Works
            </Link>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-semibold transition"
                  : "text-gray-800 hover:text-cyan-600 transition"
              }
            >
              Login
            </NavLink>
          </>
        )}
      </div>

      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl text-cyan-600 relative z-50"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full bg-white/90 rounded-3xl backdrop-blur-2xl shadow-lg z-40 px-6 py-8 flex flex-col gap-4"
          >
            {user ? (
              <>
                <NavLink
                  to="/dashboard/mypets"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-lg bg-red-500 text-white rounded-lg"
                      : "block px-4 py-2 text-lg hover:bg-red-500 hover:text-white"
                  }
                >
                  Dashboard
                </NavLink>
                {/* <NavLink
                  to="/addpets"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-lg bg-red-500 text-white rounded-lg"
                      : "block px-4 py-2 text-lg hover:bg-red-500 hover:text-white"
                  }
                >
                  Add Pet
                </NavLink> */}
                <NavLink
                  to="/lost-pets"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-lg bg-red-500 text-white rounded-lg"
                      : "block px-4 py-2 text-lg hover:bg-red-500 hover:text-white"
                  }
                >
                  Lost Pets
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-lg bg-red-500 text-white rounded-lg"
                      : "block px-4 py-2 text-lg hover:bg-red-500 hover:text-white"
                  }
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-cyan-600 text-white py-2 rounded-full hover:bg-cyan-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link smooth to="/#features"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-lg bg-red-500 text-white rounded-lg"
                      : "block px-4 py-2 text-lg hover:bg-red-500 hover:text-white"
                  }
                >
                  Features
                </Link>
                <Link smooth to="/#howItsWorks"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-lg bg-red-500 text-white rounded-lg"
                      : "block px-4 py-2 text-lg hover:bg-red-500 hover:text-white"
                  }
                >
                  How It Works
                </Link>
                <NavLink
                  to="/login"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-lg bg-red-500 text-white rounded-lg"
                      : "block px-4 py-2 text-lg hover:bg-red-500 hover:text-white"
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
