import { useState } from "react"
import { motion } from "framer-motion"

const Publications = () => {
  const initialPublications = [
    {
      title: "An ensemble approach for speaker identification from audio files",
      status: "Under Review",
      category: "Journal",
    },
    {
      title:
        "A Hybrid Tabu-Enhanced Differential Evolution Meta-Heuristic Optimization Technique for Demand Side Management in Smart Grid",
      category: "Conference",
      link: "https://www.researchgate.net/publication/325856050_A_Hybrid_Tabu-Enhanced_Differential_Evolution_Meta-Heuristic_Optimization_Technique_for_Demand_Side_Management_in_Smart_Grid",
    },
    {
      title:
        "Cost Optimization in Home Energy Management System Using Genetic Algorithm, Bat Algorithm and Hybrid Bat Genetic Algorithm",
      category: "Conference",
      link: "https://www.researchgate.net/publication/327000209_Cost_Optimization_in_Home_Energy_Management_System_Using_Genetic_Algorithm_Bat_Algorithm_and_Hybrid_Bat_Genetic_Algorithm",
    },
    {
      title:
        "Differential-Evolution-Earthworm Hybrid Meta-Heuristic Optimization Technique for Home Energy Management System in Smart Grid",
      category: "Conference",
      link: "https://link.springer.com/chapter/10.1007/978-3-319-93554-6_2",
    },
  ]

  const [publications, setPublications] = useState(initialPublications)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", category: "Journal", link: "" })
  const [editIndex, setEditIndex] = useState(null)

  const handleAddOrUpdate = (e) => {
    e.preventDefault()
    if (editIndex !== null) {
      const updatedPublications = [...publications]
      updatedPublications[editIndex] = formData
      setPublications(updatedPublications)
    } else {
      setPublications([...publications, formData])
    }
    setFormData({ title: "", category: "Journal", link: "" })
    setShowForm(false)
    setEditIndex(null)
  }

  const handleDelete = () => {
    if (editIndex !== null) {
      setPublications(publications.filter((_, i) => i !== editIndex))
      setShowForm(false)
      setEditIndex(null)
    }
  }

  const handleEdit = (index) => {
    const itemToEdit = publications[index]
    setFormData(itemToEdit)
    setEditIndex(index)
    setShowForm(true)
  }

  const categories = ["Journal", "Conference", "Chapter"]

  return (
    <motion.section
      id="publications"
      className="w-full max-w-6xl mx-auto mt-24 px-5 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>📚</span>
        <span>PUBLICATIONS</span>
      </button>
      <h1 className="text-5xl font-bold text-[#1F509A] text-center mt-20 pt-8">Publications</h1>
      {categories.map((category) => {
        const categoryPublications = publications.filter((pub) => pub.category === category)
        if (categoryPublications.length === 0 && category === "Chapter") return null

        return (
          <div key={category}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-8">{category}s</h2>
            <div className="space-y-4">
              {categoryPublications.map((pub, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer hover:scale-95 border-2 border-[#1F509A] ${
                    category === "Journal" ? "bg-blue-50" : category === "Conference" ? "bg-green-50" : "bg-yellow-50"
                  } rounded-lg p-6 shadow-md w-full flex flex-col justify-center items-center text-center transform transition duration-300 hover:shadow-lg`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => handleEdit(publications.indexOf(pub))}
                >
                  <h3 className="text-xl font-semibold text-gray-900">{pub.title}</h3>
                  {pub.link && (
                    <button
                      className="mt-4 px-6 py-2 text-lg text-white rounded-md bg-[#E38E49] hover:bg-[#174080] transition duration-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(pub.link, "_blank")
                      }}
                    >
                      Read More
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
      <motion.button
        className="mt-6 px-6 py-2 text-white text-lg rounded-md bg-[#1F509A] hover:bg-[#d67a3b] transition duration-300 w-full"
        onClick={() => {
          setShowForm(!showForm)
          if (showForm) {
            setFormData({ title: "", category: "Journal", link: "" })
            setEditIndex(null)
          }
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
          onSubmit={handleAddOrUpdate}
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 mb-3 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <select
            className="w-full p-2 mb-3 border rounded"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Link (optional)"
            className="w-full p-2 mb-3 border rounded"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
          <button type="submit" className="w-full bg-[#1F509A] text-white py-2 rounded mb-3">
            {editIndex !== null ? "Update" : "Add Publication"}
          </button>
          {editIndex !== null && (
            <button type="button" className="w-full bg-red-500 text-white py-2 rounded" onClick={handleDelete}>
              Delete
            </button>
          )}
        </motion.form>
      )}
      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </motion.section>
  )
}

export default Publications

