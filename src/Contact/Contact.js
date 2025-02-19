"use client"
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.section
      id="contact"
      className="w-full max-w-6xl mx-auto mt-24 px-5 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>📧</span>
        <span>CONTACT ME</span>
      </button>

      <h1 className="text-5xl font-bold text-[#1F509A] text-center mt-20 pt-8">Contact Us</h1>
      <p className="text-center text-gray-600 mt-4 mb-12">
        Reach out to us through any platform below!
      </p>

      <div className="flex justify-center space-x-6 text-4xl text-[#1F509A] mt-[-20px] mb-8">
        <a href="https://wa.me/923329661696" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
          <FaWhatsapp />
        </a>
        <a href="syedshahab@cuiatd.edu.pk" className="hover:text-red-500">
          <FaEnvelope />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <FaInstagram />
        </a>
      </div>


      <motion.form
        className="space-y-6 flex flex-col"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>

        <textarea
          placeholder="Message Here..."
          rows={6}
          className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A] flex-grow"
          required
        ></textarea>

        <motion.button
          type="submit"
          className="w-full text-lg bg-[#1F509A] text-white py-4 rounded-md hover:bg-[#174080] transition duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>
      </motion.form>

      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </motion.section>
  );
};

export default Contact;
