import { FaPaw, FaMapMarkerAlt, FaUserShield, FaClock, FaNotesMedical, FaPhoneAlt } from "react-icons/fa";
import { forwardRef } from "react";
const featureList = [
  {
    icon: <FaPaw className="text-2xl text-cyan-600" />,
    title: "Scan to Identify",
    desc: "QR tags reveal your pet’s profile instantly when scanned by anyone.",
  },
  {
    icon: <FaNotesMedical className="text-2xl text-cyan-600" />,
    title: "Medical Vault",
    desc: "Safely store and access vaccination records, allergies, and medical info.",
  },
  {
    icon: <FaPhoneAlt className="text-2xl text-cyan-600" />,
    title: "Emergency Alerts",
    desc: "Get real-time alerts with caller details when someone finds your pet.",
  },
  {
    icon: <FaMapMarkerAlt className="text-2xl text-cyan-600" />,
    title: "Location Tracking",
    desc: "Know exactly where your pet was last seen via GPS scan reports.",
  },
  {
    icon: <FaUserShield className="text-2xl text-cyan-600" />,
    title: "Privacy Controls",
    desc: "Only show what’s necessary. You decide what’s visible on the QR profile.",
  },
  {
    icon: <FaClock className="text-2xl text-cyan-600" />,
    title: "Live Updates",
    desc: "Update pet details anytime. Changes reflect instantly across the system.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-cyan-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">VetTag Perks for Pet Parents</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to protect, track and care for your furry companions — all in one QR-enabled system.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((item, i) => (
            <div
              key={i}
              className="bg-white/50 backdrop-blur-2xl rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-cyan-100 transition"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
