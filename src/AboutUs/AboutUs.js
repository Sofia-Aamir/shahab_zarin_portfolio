import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const AboutUs = ({ scrollToContact }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    aboutText:
      "With a strong academic background and a passion for teaching, I have mentored students, contributed to research in AI and Machine Learning, and developed expertise in web technologies.",
    publications: "6",
    reads: "1,467",
    citations: "49",
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div
      id="about"
      ref={ref}
      className={`flex flex-col items-center px-6 py-10 mt-[100px] transition-all duration-1000 ease-in-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* About Button */}
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>🏠</span>
        <span>ABOUT</span>
      </button>

      {/* About Header */}
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-5xl font-bold text-[#1F509A]">About Me</h1>
      </div>

      {/* About Description */}
      <div className="text-lg max-w-3xl text-gray-700 leading-relaxed mt-6 mb-10">
        <p>{formData.aboutText}</p>
      </div>

      {/* Statistics */}
      <div className="flex flex-wrap justify-center gap-6 text-center">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold text-[#E38E49]">{formData.publications}</h2>
          <p className="text-xl text-gray-600">Publications</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold text-[#E38E49]">{formData.reads}</h2>
          <p className="text-xl text-gray-600">Reads</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold text-[#E38E49]">{formData.citations}</h2>
          <p className="text-xl text-gray-600">Citations</p>
        </div>
      </div>

      {/* Let's Connect Button */}
      <button
        onClick={scrollToContact}
        className="mt-10 rounded-full bg-[#E38E49] px-8 py-3 text-xl font-bold text-white shadow-lg transition hover:bg-[#1F509A]"
      >
        Let's Connect!
      </button>

      {/* Update Button */}
      <button
        className="mt-6 px-6 py-2 text-white text-lg rounded-md bg-[#1F509A] hover:bg-[#d67a3b] transition duration-300 w-full"
        onClick={toggleForm}
      >
        {showForm ? "Cancel" : "Update"}
      </button>

      {/* Update Form */}
      {showForm && (
        <form className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md w-full" onSubmit={handleUpdate}>
          <textarea
            placeholder="About Me"
            className="w-full p-2 mb-3 border rounded"
            value={formData.aboutText}
            onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
            required
          ></textarea>
          <input
            type="number"
            placeholder="Publications"
            className="w-full p-2 mb-3 border rounded"
            value={formData.publications}
            onChange={(e) => setFormData({ ...formData, publications: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Reads"
            className="w-full p-2 mb-3 border rounded"
            value={formData.reads}
            onChange={(e) => setFormData({ ...formData, reads: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Citations"
            className="w-full p-2 mb-3 border rounded"
            value={formData.citations}
            onChange={(e) => setFormData({ ...formData, citations: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-[#1F509A] text-white py-2 px-4 rounded">
            Save Changes
          </button>
        </form>
      )}

      {/* Bottom Border */}
      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </div>
  );
};

export default AboutUs;
