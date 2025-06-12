import { useDebugValue, useEffect, useState } from "react";
import {
  FaPaw,
  FaQrcode,
  FaUser,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link, Outlet } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Dashboard = () => {
  const dispatch=useDispatch()

const fetchProfile=async()=>{
try {
  const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user-profile`,{withCredentials:true})
  console.log(res.data)
  dispatch(addUser(res.data))
} catch (error) {
  console.error(error)
  console.log(error)
}
}

useEffect(()=>{
  fetchProfile()
},[])

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "VetTag Dashboard";
  }, []);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 font-medium p-2 rounded-lg w-full transition ${
      isActive ? "bg-white text-cyan-700 shadow-md" : "text-black hover:bg-cyan-100"
    }`;

  return (
   <div className="flex font-poppins min-h-screen bg-cyan-100">
  <aside className="w-64 bg-cyan-400 shadow-lg p-6 hidden md:flex flex-col fixed top-0 left-0 h-screen z-30">
    <Link
      to="/"
      className="text-2xl font-extrabold text-cyan-700 mb-10 flex items-center gap-2"
    >
      VetTag <FaPaw className="text-black" />
    </Link>
    <nav className="space-y-4">
      <NavLink to="/dashboard/userProfile" className={linkClasses}>
        <FaQrcode className="text-xl" /> Profile
      </NavLink>
      <NavLink to="/dashboard/mypets" className={linkClasses}>
        <MdPets className="text-xl" /> My Pets
      </NavLink>
      <NavLink to="/dashboard/lostpets" className={linkClasses}>
        <FaMapMarkedAlt className="text-xl" /> Lost Pets Map
      </NavLink>
      <NavLink to="/dashboard/addpet" className={linkClasses}>
        <FaUser className="text-xl" /> Add Your Pet
      </NavLink>
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
        <div className="flex justify-between items-center mb-10">
          <Link
            to="/"
            className="text-2xl font-extrabold text-cyan-700 flex items-center gap-2"
          >
            VetTag <FaPaw className="text-black" />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-cyan-700 text-lg"
          >
            <FaArrowLeft />
          </button>
        </div>
        <nav className="space-y-4">
          <NavLink
            to="/dashboard/userProfile"
            className={linkClasses}
            onClick={() => setOpen(false)}
          >
            <FaQrcode className="text-xl" /> Profile
          </NavLink>
          <NavLink
            to="/dashboard/mypets"
            className={linkClasses}
            onClick={() => setOpen(false)}
          >
            <MdPets className="text-xl" /> My Pets
          </NavLink>
          {/* <NavLink
            to="/dashboard/lostpets"
            className={linkClasses}
            onClick={() => setOpen(false)}
          >
            <FaMapMarkedAlt className="text-xl" /> Lost Pets Map
          </NavLink> */}
          <NavLink
            to="/dashboard/addpet"
            className={linkClasses}
            onClick={() => setOpen(false)}
          >
            <FaUser className="text-xl" /> Add Your Pet
          </NavLink>
        </nav>
      </motion.aside>
    )}
  </AnimatePresence>

  <div className="md:ml-64 flex-1 flex flex-col h-screen overflow-hidden">
    <div className="sticky top-0 z-20 bg-cyan-100  px-4 md:px-4 py-3">
      <Header username="Alex" setOpen={setOpen} />
    </div>

    <div className="overflow-y-auto flex-1 p-4 md:p-6">
      <Outlet />
    </div>
  </div>
</div>

  );
};

export default Dashboard;
