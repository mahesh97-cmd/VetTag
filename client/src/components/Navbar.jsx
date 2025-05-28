import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPaw } from "react-icons/fa6";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-7xl bg-white/60 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center justify-between">
      <Link to="/" className=" text-xl md:text-2xl font-bold text-cyan-600 flex items-center ">
        VetTag <FaPaw className="text-black mx-2"/>

      </Link>
 
      <div className="hidden md:flex items-center gap-6 font-medium">
        <Link
          to="/dashboard"
          className="text-gray-800 hover:text-cyan-600 transition  "
        >
          Dashboard
        </Link>
        <Link
          to="/addpets"
          className="text-gray-800 hover:text-cyan-600 transition "
        >
          Add Pet
        </Link>
        <Link
          to="/lost-pets"
          className="text-gray-800 hover:text-cyan-600 transition "
        >
          Lost Pets
        </Link>
        <Link
          to="/profile"
          className="text-gray-800 hover:text-cyan-600 transition "
        >
          Profile
        </Link>
        <button className="ml-4 bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-700 transition">
          Logout
        </button>
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
            <Link
              to="/dashboard"
              onClick={toggleMenu}
              className="block px-4 py-2 rounded-md text-gray-800 text-lg hover:bg-red-500 hover:text-white transition"
            >
              Dashboard
            </Link>
            <Link
              to="/addpets"
              onClick={toggleMenu}
              className="block px-4 py-2 rounded-md text-gray-800 text-lg hover:bg-red-500 hover:text-white transition"
            >
              Add Pet
            </Link>
            <Link
              to="/lost-pets"
              onClick={toggleMenu}
              className="block px-4 py-2 rounded-md text-gray-800 text-lg hover:bg-red-500 hover:text-white transition"
            >
              Lost Pets
            </Link>
            <Link
              to="/profile"
              onClick={toggleMenu}
              className="block px-4 py-2 rounded-md text-gray-800 text-lg hover:bg-red-500 hover:text-white transition"
            >
              Profile
            </Link>
            <button
              onClick={toggleMenu}
              className="bg-cyan-600 text-white py-2 rounded-full hover:bg-cyan-700 transition"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
