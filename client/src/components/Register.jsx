import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registered!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cyan-50">
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-cyan-600 mb-6">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-2 rounded-lg transition"
            >
              Register
            </button>
          </form>
          <p className="text-sm mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block w-1/2 bg-cyan-400">
        <img
          src="/vet-register.jpg"
          alt="Register"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Register;
