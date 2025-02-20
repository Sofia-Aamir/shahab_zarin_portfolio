"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"

const initialSportsData = {
  volleyball: [
    { game: "Volleyball", place: "Captain The Revenant Volleyball Club Islamabad", date: "Since 2021" },
    { game: "Volleyball", place: "Player of COMSATS University Islamabad Volleyball Team", date: "2017-2021" },
    { game: "Volleyball", place: "Player of Peshawar University Volleyball Team", date: "2013-2016" },
    { game: "Volleyball", place: "Player of GDC Daggar Volleyball Team", date: "2011-2013" },
    { game: "Volleyball", place: "Captain SPS College Swat Volleyball Team", date: "-" },
    { game: "Volleyball", place: "Player of BISE Swat Volleyball team", date: "2009-2010" },
    { game: "Volleyball", place: "President Syed Volleyball Club Nawakalay Buner", date: "-" },
  ],
  tableTennis: [
    { game: "Table Tennis", place: "Zone Champion", date: "2013" },
    { game: "Table Tennis", place: "Table Tennis player of University of Swat", date: "2011-2013" },
    { game: "Table Tennis", place: "Table Tennis player of GDC Daggar Buner", date: "2011-2013" },
  ],
}

const Sports = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [sportsData, setSportsData] = useState({ ...initialSportsData })
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ category: "volleyball", game: "", place: "", date: "" })
  const [editIndex, setEditIndex] = useState(null)

  const handleRowClick = (category, index) => {
    setFormData({ category, ...sportsData[category][index] })
    setEditIndex({ category, index })
    setShowForm(true)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const updatedData = { ...sportsData }

    if (editIndex !== null) {
      updatedData[editIndex.category][editIndex.index] = formData
    } else {
      updatedData[formData.category].push(formData)
    }

    setSportsData(updatedData)
    setFormData({ category: "volleyball", game: "", place: "", date: "" })
    setShowForm(false)
    setEditIndex(null)
  }

  const handleDelete = () => {
    const updatedData = { ...sportsData }
    updatedData[editIndex.category] = updatedData[editIndex.category].filter((_, i) => i !== editIndex.index)
    setSportsData(updatedData)
    setShowForm(false)
    setEditIndex(null)
  }

  const handleAddMoreClick = () => {
    setShowForm(!showForm)
    setFormData({ category: "volleyball", game: "", place: "", date: "" })
    setEditIndex(null)
  }

  return (
    <section
      id="sports"
      ref={ref}
      className={`w-full max-w-6xl mx-auto mt-24 px-5 relative transition-all duration-1000 ease-in-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-sm font-semibold border-2 border-gray-800 rounded-full px-3 py-1 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span className="text-lg">⚽</span>
        <span>SPORTS</span>
      </button>

      <h1 className="text-5xl font-bold text-[#1F509A] text-center mt-20 pt-8">Sports Achievements</h1>

      {Object.entries(sportsData).map(([category, data]) => (
        <div key={category} className="mt-12">
          <h2 className="text-4xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
            {category === "volleyball" ? "Volleyball" : "Table Tennis"}
          </h2>
          <ul className="mt-6 space-y-4">
            {data.map((sport, index) => (
              <li
                key={index}
                onClick={() => handleRowClick(category, index)}
                className="group flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:bg-gray-50"
              >
                <span className="text-[#1F509A] flex-shrink-0 transform transition-transform group-hover:rotate-12 text-lg">
                  ⚽
                </span>
                <div className="flex flex-grow items-center justify-between">
                  <p className="text-gray-800 text-lg font-medium">{sport.place}</p>
                  <span className="text-gray-500 text-base whitespace-nowrap ml-4">{sport.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        onClick={handleAddMoreClick}
        className="mt-8 bg-[#1F509A] text-white px-4 py-2 rounded-md w-full hover:bg-[#1F509A]/90 transition-colors"
      >
        {showForm ? "Cancel" : "Add More"}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="mt-6 border p-6 rounded-md bg-white shadow-sm">
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full text-lg"
          >
            <option value="volleyball">Volleyball</option>
            <option value="tableTennis">Table Tennis</option>
          </select>
          <input
            name="game"
            value={formData.game}
            onChange={handleInputChange}
            placeholder="Game"
            className="border p-2 rounded-md w-full mt-2 text-lg"
            required
          />
          <input
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            placeholder="Place"
            className="border p-2 rounded-md w-full mt-2 text-lg"
            required
          />
          <input
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            placeholder="Date"
            className="border p-2 rounded-md w-full mt-2 text-lg"
          />
          {editIndex !== null && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-2 hover:bg-red-600 transition-colors text-lg"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="bg-[#1F509A] text-white px-4 py-2 rounded-md w-full mt-2 hover:bg-[#1F509A]/90 transition-colors text-lg"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>
      )}

      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </section>
  )
}

export default Sports

