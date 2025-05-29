import { useEffect, useState } from "react";
import {
  FaPaw,
  FaQrcode,
  FaUser,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./Header";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "VetTag Dashboard";
  }, []);

  return (
    <div className="flex font-poppins min-h-screen bg-cyan-100 relative">
      <aside className="w-64 bg-cyan-400 shadow-lg p-6 hidden md:block">
        <Link to="/" className="text-2xl font-extrabold text-cyan-700 mb-10 flex items-center gap-2">
          VetTag
          <FaPaw className="text-black" />
        </Link>
        <nav className="space-y-4">
          <Link to="/mypets" className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
            <MdPets className="text-xl" /> My Pets
          </Link>
          <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
            <FaQrcode className="text-xl" /> QR Tags
          </button>
          <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
            <FaMapMarkedAlt className="text-xl" /> Lost Pets Map
          </button>
          <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
            <FaUser className="text-xl" /> Profile
          </button>
        </nav>
      </aside>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-0 left-0 w-64 h-full bg-cyan-400 shadow-lg p-6 z-40 md:hidden"
          >
            <div className="flex justify-between items-center mb-10  ">
              <Link to="/" className="text-2xl font-extrabold text-cyan-700 flex items-center gap-2">
                VetTag
                <FaPaw className="text-black" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="text-cyan-700 text-lg"
              >
                <FaArrowLeft />
              </button>
            </div>
            <nav className="space-y-4">
              <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
                <MdPets className="text-xl" /> My Pets
              </button>
              <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
                <FaQrcode className="text-xl" /> QR Tags
              </button>
              <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
                <FaMapMarkedAlt className="text-xl" /> Lost Pets Map
              </button>
              <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
                <FaUser className="text-xl" /> Profile
              </button>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 p-4 md:p-6">
        <Header username="Alex" setOpen={setOpen} />
        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-bold text-cyan-700 mb-4">Your Pets</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/dog-placeholder.jpg"
                    alt="Pet"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium text-gray-800">Bruno (Dog)</span>
                </div>
                <button className="text-sm bg-cyan-100 text-cyan-700 px-3 py-1 rounded-lg">
                  View
                </button>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/cat-placeholder.jpg"
                    alt="Pet"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium text-gray-800">
                    Mittens (Cat)
                  </span>
                </div>
                <button className="text-sm bg-cyan-100 text-cyan-700 px-3 py-1 rounded-lg">
                  View
                </button>
              </li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
