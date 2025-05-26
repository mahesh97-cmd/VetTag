import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/d&c.png";
import Features from "./Features";
import HowItWorks from "./HowItsWork";

const Home = () => {
  return (
    <>
    <section className="min-h-screen bg-cyan-400 flex items-center py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <h1 className=" text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Secure Your Pet’s Future with <br />
              <span className="text-blue-900 text-3xl md:text-6xl ">VetTag</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-cyan-700">
              From lost pet recovery to vaccination tracking, VetTag keeps
              everything organized and accessible. Your pet's health and safety,
              always at your fingertips.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold shadow-lg text-sm sm:text-base"
              >
                Create Pet Profile
              </Link>
              <Link
                to="/login"
                className="border border-white text-white hover:bg-white hover:text-cyan-600 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base"
              >
                Login
              </Link>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start gap-3 text-sm">
              <FeaturePill text="📦 Free QR Tag Setup" />
              <FeaturePill text="📋 Health Records" />
              <FeaturePill text="🕵️‍♂️ Lost & Found Map" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-1 lg:order-2 w-full flex justify-center items-center"
          >
            <img
              src={bg}
              alt="VetTag dog illustration"
              className="max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
    <Features />
      <HowItWorks />
    </>
  );
};

const FeaturePill = ({ text }) => (
  <span className="flex items-center px-4 py-1 bg-white text-cyan-600 border border-cyan-200 rounded-full shadow-sm">
    {text}
  </span>
);

export default Home;
