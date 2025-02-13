import React, { useState } from "react";
import { FaHome, FaUser, FaGraduationCap, FaBriefcase, FaBook, FaBasketballBall, FaImages, FaChalkboardTeacher, FaPhone } from "react-icons/fa";
import { Link } from 'react-scroll';

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome />, text: "Home", to: "home" },
    { icon: <FaUser />, text: "About", to: "about" },
    { icon: <FaGraduationCap />, text: "Education", to: "education" },
    { icon: <FaBriefcase />, text: "Experience", to: "experience" },
    { icon: <FaBook />, text: "Publications", to: "publications" },
    { icon: <FaBasketballBall />, text: "Sports", to: "sports" },
    { icon: <FaImages />, text: "Gallery", to: "gallery" },
    { icon: <FaChalkboardTeacher />, text: "Supervision", to: "supervision" },
    { icon: <FaPhone />, text: "Contact Us", to: "contact" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 text-4xl text-[#E38E49]"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar Menu (Large Screens) */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-6 bg-[#1F509A] p-4 rounded-xl shadow-xl">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            smooth={true}
            duration={500}
            className="relative group text-white text-4xl cursor-pointer"
          >
            {item.icon}
            <span className="absolute right-full mr-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {item.text}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#1F509A] flex flex-col items-center justify-center text-white z-50">
          <button className="absolute top-4 right-4 text-4xl" onClick={() => setIsOpen(false)}>✖</button>
          <div className="flex flex-col space-y-6 text-3xl">
            {menuItems.map((item, index) => (
              <div key={index} className="cursor-pointer">
                <Link
                  to={item.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)} // Close menu on selection
                >
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMenu;
