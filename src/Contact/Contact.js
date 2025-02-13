"use client"
import { motion } from "framer-motion"

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

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
        Feel free to contact us? submit your queries here and we will listen
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#1F509A] text-white p-6 rounded-lg h-[200px] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">📞</span>
              <span className="font-semibold">Call Me Directly At</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">+92 332 9661696</h3>
          </div>
          <button className="w-full text-lg bg-white text-[#1F509A] py-2 rounded-md hover:bg-gray-100 transition duration-300">
            Contact Me
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg h-[200px] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">💬</span>
              <span className="font-semibold">Chat With Me</span>
            </div>
            <h3 className="text-xl font-bold mb-2">syedshahab@cuiatd.edu.pk</h3>
          </div>
          <button className="w-full text-lg bg-[#1F509A] text-white py-2 rounded-md hover:bg-[#174080] transition duration-300">
            Contact Me
          </button>
        </div>
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
  )
}

export default Contact

