import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const initialEducationData = [
  {
    degree: "MS Computer Science",
    university: "COMSATS University Islamabad",
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
    degree: "BSc Computer Science",
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
  const [educationData, setEducationData] = useState(initialEducationData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ degree: "", university: "", year: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleAddEducation = (e) => {
    e.preventDefault();
    const newEducation = { ...formData };

    if (editIndex !== null) {
      const updatedEducation = [...educationData];
      updatedEducation[editIndex] = newEducation;
      setEducationData(updatedEducation);
      setEditIndex(null);
    } else {
      setEducationData([newEducation, ...educationData]);
    }

    setFormData({ degree: "", university: "", year: "", description: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(educationData[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (editIndex !== null) {
      setEducationData(educationData.filter((_, i) => i !== editIndex));
      setEditIndex(null);
      setShowForm(false);
      setFormData({ degree: "", university: "", year: "", description: "" });
    }
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    handleEdit(index);
  };

  const toggleForm = () => {
    if (showForm) {
      setShowForm(false);
      setEditIndex(null);
      setFormData({ degree: "", university: "", year: "", description: "" });
    } else {
      setShowForm(true);
    }
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
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
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

      <button
        className="mt-6 px-6 py-2 text-white text-lg rounded-md bg-[#1F509A] hover:bg-[#d67a3b] transition duration-300 w-full"
        onClick={toggleForm}
      >
        {showForm ? "Cancel" : "Add More"}
      </button>

      {showForm && (
        <form className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md" onSubmit={handleAddEducation}>
          <input
            type="text"
            placeholder="Degree"
            className="w-full p-2 mb-3 border rounded"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="University"
            className="w-full p-2 mb-3 border rounded"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Year"
            className="w-full p-2 mb-3 border rounded"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 mb-3 border rounded"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>
          <div className="flex flex-col space-y-2">
            <button type="submit" className="w-full bg-[#1F509A] text-white py-2 px-4 rounded">
              {editIndex !== null ? "Update Education" : "Add Education"}
            </button>
            {editIndex !== null && (
              <button type="button" onClick={handleDelete} className="w-full bg-red-500 text-white py-2 px-4 rounded">
                Delete
              </button>
            )}
          </div>
        </form>
      )}

      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </div>
  );
};

export default Education;
