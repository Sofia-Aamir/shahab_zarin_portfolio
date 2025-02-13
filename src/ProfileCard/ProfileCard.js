import React from "react";
import { FaLinkedin, FaUniversity } from "react-icons/fa";
import { SiResearchgate } from "react-icons/si";
import Home from "../Home/Home"; // Import Home section
import RightMenu from "../RightMenu/RightMenu"; // Import Sidebar Menu
import AboutUs from "../AboutUs/AboutUs"; // Import About Us section
import Education from "../Education/Education";
import WorkExperience from "../WorkExperience/WorkExperience";
import Publications from "../Publications/Publications";
import Sports from "../Sports/Sports";
import Gallery from "../Gallery/Gallery";
import Supervision from "../Supervision/Supervision";

const ProfileCard = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row bg-[#D4EBF8]">
      {/* Profile Card - Full Width on Small Screens, Fixed Sidebar on Large */}
      <div className="w-full h-screen bg-[#1F509A] text-white p-10 shadow-2xl flex flex-col items-center relative lg:fixed lg:top-0 lg:left-0 lg:w-1/4">
        {/* Settings Icon */}
        <div className="absolute top-6 left-6 text-[#D4EBF8]">
          <span className="text-3xl">⚙️</span>
        </div>

        {/* Name & Title */}
        <div className="text-center mt-6">
          <h1 className="text-5xl font-bold">Shahab</h1>
          <p className="text-[#D4EBF8] text-2xl mt-2">Lecturer, Computer Science</p>
        </div>

        {/* Profile Image */}
        <div className="mt-8">
          <img
            src="/Images/profile.png"
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-[#0A3981]"
          />
        </div>

        {/* Email & Location */}
        <div className="text-center mt-8">
          <p className="text-2xl">syedshahab@cuiatd.edu.pk</p>
          <p className="text-[#D4EBF8] text-lg">+92-992-383591-5</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mt-8 text-[#D4EBF8] text-4xl">
          <a href="https://www.linkedin.com/in/syed-shahab-zarin-0a8b36155/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-[#E38E49] transition" />
          </a>
          <a href="https://www.researchgate.net/profile/Syed-Zarin" target="_blank" rel="noopener noreferrer">
            <SiResearchgate className="hover:text-[#E38E49] transition" />
          </a>
          <a href="https://www.cuiatd.edu.pk/faculty/syed-shahab-zarin/" target="_blank" rel="noopener noreferrer">
            <FaUniversity className="hover:text-[#E38E49] transition" />
          </a>
        </div>

        {/* Hire Me Button */}
        <div className="mt-8">
          <button className="bg-[#E38E49] text-white px-10 py-3 rounded-full text-2xl font-bold hover:bg-[#D4EBF8] hover:text-[#1F509A] transition">
            📩 HIRE ME!
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col items-center lg:ml-[30%] lg:mr-[15%]">
        {/* Home Section */}
        <div className="w-full h-screen">
          <Home />
        </div>

       {/* About Us Section */}
<div className="w-full mb-2"> {/* Reduced mb-10 to mb-2 */}
  <AboutUs />
</div>

{/* Education Section */}
<div className="w-full mb-2">
  <Education />
</div>

{/* Education Section */}
<div className="w-full mb-2">
  <WorkExperience />
</div>

{/* Education Section */}
<div className="w-full mb-2">
  <Publications/>
</div>

<div className="w-full mb-2">
  <Sports/>
</div>

<div className="w-full mb-2">
  <Gallery/>
</div>

<div className="w-full mb-2">
  <Supervision/>
</div>
      </div>

      {/* Sidebar Menu - Fixed on Right Side for Large Screens */}
      <div className="hidden lg:flex fixed right-4 top-1/2 transform -translate-y-1/2">
        <RightMenu />
      </div>
    </div>
  );
};

export default ProfileCard;
