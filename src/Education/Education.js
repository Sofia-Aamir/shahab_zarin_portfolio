import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const educationData = [
  {
    degree: "MS Computer Science",
    university: "COMSATS University Islamabad, Abbottabad Campus",
    year: "Year : 2022",
    description: "Specialized in AI and Machine Learning with research in deep learning applications.",
  },
  {
    degree: "MSc Computer Science",
    university: "University of Peshawar",
    year: "Year : 2016",
    description: "Focused on software development and advanced programming techniques.",
  },
  {
    degree: "BSc Computer Science, Physics, Math",
    university: "University of Swat",
    year: "Year : 2013",
    description: "Gained strong foundational knowledge in computing and problem-solving.",
  },
  {
    degree: "FSc (Pre-Engineering)",
    university: "SPS College Swat",
    year: "Year : 2010",
    description: "Developed a strong understanding of mathematics and physics.",
  },
  {
    degree: "SSC (Science)",
    university: "Buner Model School Rega",
    year: "Year : 2008",
    description: "Early education with a focus on science subjects and critical thinking.",
  },
];

const Education = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="education"
      ref={ref}
      className={`w-full max-w-4xl mx-auto mt-16 pt-0 px-5 relative transition-all duration-1000 ease-in-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>🎓</span>
        <span>EDUCATION</span>
      </button>

      <div className="flex justify-center items-center text-center space-x-2 mb-10">
        <h1 className="text-5xl font-bold text-[#1F509A] mt-12">Education</h1>
      </div>

      <div className="space-y-4">
        {educationData.map((item, index) => (
          <div
            key={index}
            className="border-2 border-[#1F509A] rounded-lg overflow-hidden shadow-md transition-all"
          >
            <button
              className="w-full flex flex-col items-center px-5 py-4 bg-[#E38E49] text-lg font-semibold relative"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-black text-center">{item.degree}</span>
              <span className="text-black text-lg text-center">{item.university}</span>
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">{openIndex === index ? <FaChevronUp /> : <FaChevronDown />}</div>
            </button>
            {openIndex === index && (
              <div className="bg-white p-4 text-gray-700">
                <p className="text-lg text-black">{item.year}</p>
                <p className="text-md text-gray-1000 mt-2 italic">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </div>
  );
};

export default Education;
