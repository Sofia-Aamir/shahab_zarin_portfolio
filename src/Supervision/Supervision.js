import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

const initialProjects = [
  {
    id: 1,
    name: "Healthcare Management System with Kidney Tumor Detection and Prediction",
    students: [{ name: "Syeda Batool Fatima", regNo: "CIIT/FA21-BSE-153/ATD" }],
    readMoreLink: "",
    file: null,
  },
  {
    id: 2,
    name: "IoT-based Honeypot Network for Cybersecurity Threat Detection and Attack Analysis",
    students: [
      { name: "Zakirullah Salar", regNo: "CIIT/FA21-BCS-186/ATD" },
      { name: "Salim", regNo: "CIIT/FA21-BCS-193/ATD" },
      { name: "Mohammad Zahid Rehmat", regNo: "CIIT/FA21-BCS-222/ATD" },
    ],
    readMoreLink: "",
    file: null,
  },
]

const Supervision = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [projects, setProjects] = useState(initialProjects)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [newProject, setNewProject] = useState({
    name: "",
    students: [{ name: "", regNo: "" }],
    readMoreLink: "",
    file: null,
  })

  const handleProjectClick = (project) => {
    setEditingProject(project)
    setShowForm(true)
    setNewProject(project)
  }

  const handleAddOrUpdateProject = (e) => {
    e.preventDefault()
    if (editingProject) {
      const updatedProjects = projects.map((p) => (p.id === editingProject.id ? { ...newProject, id: p.id } : p))
      setProjects(updatedProjects)
    } else {
      setProjects([...projects, { ...newProject, id: projects.length + 1 }])
    }
    resetForm()
  }

  const handleDeleteProject = () => {
    if (editingProject) {
      const updatedProjects = projects.filter((p) => p.id !== editingProject.id)
      setProjects(updatedProjects)
      resetForm()
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProject(null)
    setNewProject({
      name: "",
      students: [{ name: "", regNo: "" }],
      readMoreLink: "",
      file: null,
    })
  }

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...newProject.students]
    updatedStudents[index][field] = value
    setNewProject({ ...newProject, students: updatedStudents })
  }

  const addStudentField = () => {
    setNewProject({
      ...newProject,
      students: [...newProject.students, { name: "", regNo: "" }],
    })
  }

  const handleFileChange = (e) => {
    setNewProject({ ...newProject, file: e.target.files[0] })
  }

  return (
    <section
      id="supervision"
      ref={ref}
      className={`w-full max-w-6xl mx-auto mt-24 px-5 relative transition-all duration-1000 ease-in-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>📂</span>
        <span>SUPERVISION</span>
      </button>

      <h2 className="text-5xl font-bold text-[#1F509A] text-center mt-20 pt-8">Supervised Projects</h2>

      <div className="mt-8 space-y-8">
        {projects.map((project) => (
          <div key={project.id} className="flex items-start space-x-6" onClick={() => handleProjectClick(project)}>
            <div className="flex items-center justify-center w-16 h-16 bg-[#1F509A] text-white font-bold text-5xl rounded-full">
              {project.id}
            </div>

            <div className="border-2 border-[#1F509A] rounded-lg p-4 w-full bg-white shadow-md relative cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
              <ul className="mt-1 text-gray-700">
                {project.students.map((student, index) => (
                  <li key={index} className="mt-0.5 text-lg">
                    {student.name} - <span className="font-mono text-lg">{student.regNo}</span>
                  </li>
                ))}
              </ul>
              {(project.readMoreLink || project.file) && (
                <a
                  href={project.readMoreLink || (project.file && URL.createObjectURL(project.file))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block px-6 py-2 text-lg text-white rounded-md bg-[#E38E49] hover:bg-[#174080] transition duration-300"
                >
                  Read More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <motion.button
        className="mt-6 px-6 py-2 text-white text-lg rounded-md bg-[#1F509A] hover:bg-[#d67a3b] transition duration-300 w-full"
        onClick={() => {
          setShowForm(!showForm)
          setEditingProject(null)
          setNewProject({
            name: "",
            students: [{ name: "", regNo: "" }],
            readMoreLink: "",
            file: null,
          })
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showForm ? "Cancel" : "Add More"}
      </motion.button>

      {showForm && (
        <motion.form
          className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleAddOrUpdateProject}
        >
          <input
            type="text"
            placeholder="Project Name"
            className="w-full p-2 mb-3 border rounded"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            required
          />

          {newProject.students.map((student, index) => (
            <div key={index} className="flex space-x-2 mb-3">
              <input
                type="text"
                placeholder="Student Name"
                className="w-1/2 p-2 border rounded"
                value={student.name}
                onChange={(e) => handleStudentChange(index, "name", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Registration Number"
                className="w-1/2 p-2 border rounded"
                value={student.regNo}
                onChange={(e) => handleStudentChange(index, "regNo", e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addStudentField} className="text-blue-600 underline">
            + Add Another Student
          </button>

          <input type="file" className="w-full p-2 mt-3 border rounded" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Read More Link (Optional)"
            className="w-full p-2 mt-3 mb-4 border rounded"
            value={newProject.readMoreLink}
            onChange={(e) => setNewProject({ ...newProject, readMoreLink: e.target.value })}
          />

          <div className="flex flex-col space-y-4 mt-4">
            <button
              type="submit"
              className="bg-[#1F509A] text-lg text-white font-semibold px-4 py-2 rounded-md hover:bg-[#163F7A] transition w-full"
            >
              {editingProject ? "Update Project" : "Add Project"}
            </button>
            {editingProject && (
              <button
                type="button"
                onClick={handleDeleteProject}
                className="bg-red-500 text-lg text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition w-full"
              >
                Delete Project
              </button>
            )}
          </div>
        </motion.form>
      )}
         <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </section>
  )
}

export default Supervision

