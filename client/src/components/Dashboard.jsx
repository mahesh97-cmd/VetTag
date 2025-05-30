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
import { Link, Outlet } from "react-router-dom";
import MyPets from "./Mypets";

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
          <Link to="/dashboard/mypets" className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
            <MdPets className="text-xl" /> My Pets
          </Link>
          <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
            <FaQrcode className="text-xl" /> QR Tags
          </button>
          <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
            <FaMapMarkedAlt className="text-xl" /> Lost Pets Map
          </button>
          <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
            <FaUser className="text-xl" /> Add Your Pet
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
              <Link to="/dashboard/mypets" className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
                <MdPets className="text-xl" /> My Pets
              </Link>
              <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
                <FaQrcode className="text-xl" /> QR Tags
              </button>
              <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
                <FaMapMarkedAlt className="text-xl" /> Lost Pets Map
              </button>
              {/* <button className="flex items-center gap-3 text-black font-medium hover:bg-cyan-100 p-2 rounded-lg w-full">
                <FaUser className="text-xl" /> Profile
              </button> */}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 p-4 md:p-6">
        <Header username="Alex" setOpen={setOpen} />
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
