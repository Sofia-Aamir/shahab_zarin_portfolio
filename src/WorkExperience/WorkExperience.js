import { useState } from "react"
import { FaBriefcase, FaChalkboardTeacher } from "react-icons/fa"
import { useInView } from "react-intersection-observer"

const WorkExperience = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const initialExperience = [
    {
      title: "Lecturer",
      company: "COMSATS University Islamabad, Abbottabad Campus",
      duration: "February 2023 - Present",
      description:
        "Delivering lectures, conducting research, mentoring students, and contributing to curriculum development. Engaging in academic collaborations and participating in faculty meetings.",
      icon: <FaChalkboardTeacher />,
      editable: false,
    },
    {
      title: "Lecturer (Visiting)",
      company: "Abdul Wali Khan University Mardan (Buner Campus)",
      duration: "April 2016 - April 2017",
      description:
        "Lecture planning, preparation and research, contact and teaching time with students, attending staff meetings.",
      icon: <FaChalkboardTeacher />,
      editable: false,
    },
    {
      title: "Lecturer (Contract)",
      company: "Govt Degree College Daggar Buner",
      duration: "September 2016 - September 2017",
      description: "General administration, Preparing and delivering lectures, invigilating examinations.",
      icon: <FaChalkboardTeacher />,
      editable: false,
    },
    {
      title: "Lecturer (Visiting)",
      company: "University of Buner",
      duration: "April 2017 - September 2017",
      description:
        "Preparing and delivering lectures, contact and teaching time with students, attending staff meetings.",
      icon: <FaChalkboardTeacher />,
      editable: false,
    },
    {
      title: "Web Developer",
      company: "Techuire",
      duration: "September 2017 - September 2019",
      description:
        "Responsible for the coding, design, and layout of a website according to a company's specifications.",
      icon: <FaBriefcase />,
      editable: false,
    },
  ]

  const [experienceData, setExperienceData] = useState(initialExperience)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", company: "", duration: "", description: "" })
  const [editIndex, setEditIndex] = useState(null)

  const handleAddExperience = (e) => {
    e.preventDefault()
    const newExperience = { ...formData, icon: <FaBriefcase />, editable: true }
    if (editIndex !== null) {
      const updatedExperience = [...experienceData]
      updatedExperience[editIndex] = newExperience
      setExperienceData(updatedExperience)
      setEditIndex(null)
    } else {
      setExperienceData([newExperience, ...experienceData])
    }
    setFormData({ title: "", company: "", duration: "", description: "" })
    setShowForm(false)
  }

  const handleEdit = (index) => {
    setFormData(experienceData[index])
    setEditIndex(index)
    setShowForm(true)
  }

  const handleDelete = () => {
    if (editIndex !== null) {
      setExperienceData(experienceData.filter((_, i) => i !== editIndex))
      setEditIndex(null)
      setShowForm(false)
      setFormData({ title: "", company: "", duration: "", description: "" })
    }
  }

  return (
    <div
      id="experience"
      ref={ref}
      className={`w-full max-w-4xl mx-auto mt-28 px-5 relative transition-all duration-1000 ease-in-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>💼</span>
        <span>EXPERIENCE</span>
      </button>
      <h1 className="text-5xl font-bold text-[#1F509A] text-center mt-20 pt-8">Work Experience</h1>
      <div className="relative border-l-4 border-[#E38E49] pl-6 space-y-6 mt-10">
        {experienceData.map((exp, index) => (
          <div key={index} className="relative flex items-start space-x-4" onClick={() => handleEdit(index)}>
            <div className="absolute -left-12 bg-[#E38E49] p-3 rounded-full text-white text-xl">{exp.icon}</div>
            <div className="bg-white shadow-md rounded-lg p-5 border border-[#1F509A] w-full relative cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <h2 className="text-xl font-bold text-gray-900">
                {exp.company} - {exp.title}
              </h2>
              <p className="text-lg text-gray-900">{exp.duration}</p>
              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-6 px-6 py-2 text-white text-lg rounded-md bg-[#1F509A] hover:bg-[#d67a3b] transition duration-300 w-full"
        onClick={() => {
          if (showForm) {
            setShowForm(false)
            setEditIndex(null)
            setFormData({ title: "", company: "", duration: "", description: "" })
          } else {
            setShowForm(true)
            setEditIndex(null)
            setFormData({ title: "", company: "", duration: "", description: "" })
          }
        }}
      >
        {showForm ? "Cancel" : "Add More"}
      </button>

      {showForm && (
        <form className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md" onSubmit={handleAddExperience}>
          <input
            type="text"
            placeholder="Position"
            className="w-full p-2 mb-3 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            className="w-full p-2 mb-3 border rounded"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Duration"
            className="w-full p-2 mb-3 border rounded"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
              {editIndex !== null ? "Update Experience" : "Add Experience"}
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
  )
}

export default WorkExperience

