import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-cyan-900 text-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="font-bold text-xl">VetTag</h2>
          <p className="text-sm">Caring for your pets, one tag one solution</p>
        </div>

        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </div>

        <div className="flex space-x-4">
          <a href="" aria-label="Facebook" className="hover:text-blue-600">
            <FaFacebookF size={20} />
          </a>
          <a href="" aria-label="Instagram" className="hover:text-pink-500">
            <FaInstagram size={20} />
          </a>
          <a href="" aria-label="Twitter" className="hover:text-blue-400">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-4 pt-4 border-t text-center text-sm">
        © {new Date().getFullYear()} VetTag. All rights reserved.
      </div>
    </footer>
);
}
