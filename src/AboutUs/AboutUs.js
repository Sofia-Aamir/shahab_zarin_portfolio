import React from "react";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger animation when 10% is visible
  });

  return (
    <div
    id="about"
    ref={ref}
    className={`flex flex-col items-center px-6 py-10 mt-[-220px] transition-all duration-1000 ease-in-out will-change-transform ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
  
      {/* About Button - Positioned above the center */}
      <button className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition" style={{ top: '-20px' }}>
        <span>ℹ️</span> {/* Information Icon */}
        <span>ABOUT</span> {/* Text */}
      </button>

     {/* About Us Section */}
<div className="flex justify-center items-center text-center space-x-2 mb-10"> {/* Reduced space-x and added mb-2 */}
  <h1 className="text-5xl font-bold text-[#1F509A]">About Us</h1>
</div>

{/* About Content */}
<div className="text-lg max-w-3xl text-gray-700 leading-relaxed mb-10"> {/* Reduced mb-10 to mb-4 */}
  <p className="text-lg max-w-3xl text-gray-700 leading-relaxed">
    With a strong academic background and a passion for teaching, I have mentored students, contributed to research in AI and Machine Learning, and developed expertise in web technologies. My journey spans across various universities, where I have inspired and guided aspiring professionals. Dedicated to continuous learning, I aim to drive innovation through research and knowledge-sharing.
  </p>
</div>


      {/* Statistics */}
      <div className="flex flex-wrap justify-center gap-6 text-center">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold text-[#E38E49]">6</h2>
          <p className="text-xl text-gray-600">Publications</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold text-[#E38E49]">1,467</h2>
          <p className="text-xl text-gray-600">Reads</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold text-[#E38E49]">49</h2>
          <p className="text-xl text-gray-600">Citations</p>
        </div>
      </div>

      {/* Line below the entire page */}
      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </div>
  );
};

export default AboutUs;
