import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Header = ({ setOpen }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md px-6 py-4 mb-6 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <motion.button
            onClick={() => setOpen(true)}
            className="text-xl text-white bg-cyan-800 shadow p-2 rounded-full"
            whileTap={{ scale: 0.9 }}
          >
            <MdDashboard />
          </motion.button>
        </div>

        <div>
          <h1 className="text-xl font-bold text-cyan-700">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 text-cyan-700">
        <FaUserCircle className="text-3xl" />
        <span className="font-medium">Alex</span>
      </div>
    </motion.header>
  );
};

export default Header;
