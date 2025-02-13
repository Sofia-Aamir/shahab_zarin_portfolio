import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const initialSportsData = [
  { game: "Volleyball", place: "President Syed Volleyball Club Nawakalay Buner", date: "-" },
  { game: "Volleyball", place: "Player of BISE Swat Volleyball team", date: "2009-2010" },
  { game: "Volleyball", place: "Captain SPS College Swat Volleyball Team", date: "-" },
  { game: "Volleyball", place: "Player of GDC Daggar Volleyball Team", date: "2011-2013" },
  { game: "Volleyball", place: "Player of Peshawar University Volleyball Team", date: "2013-2016" },
  { game: "Volleyball", place: "Player of COMSATS University Islamabad Volleyball Team", date: "2017-2021" },
  { game: "Volleyball", place: "Captain The Revenant Volleyball Club Islamabad", date: "Since 2021" },
  { game: "Table Tennis", place: "Table Tennis player of GDC Daggar Buner", date: "2011-2013" },
  { game: "Table Tennis", place: "Table Tennis player of University of Swat", date: "2011-2013" },
  { game: "Table Tennis", place: "Zone Champion", date: "2013" }
];

const Sports = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [sportsData, setSportsData] = useState([...initialSportsData]); // Ensure all 10 records are included
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ game: "", place: "", date: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Handle row click for editing
  const handleRowClick = (index) => {
    setFormData(sportsData[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for Add/Update
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...sportsData];

    if (editIndex !== null) {
      // Update existing record
      updatedData[editIndex] = formData;
    } else {
      // Add new record
      updatedData.push(formData);
    }

    setSportsData(updatedData);
    setFormData({ game: "", place: "", date: "" }); // Reset form
    setShowForm(false);
    setEditIndex(null);
  };

  // Handle delete
  const handleDelete = () => {
    const updatedData = sportsData.filter((_, i) => i !== editIndex);
    setSportsData(updatedData);
    setShowForm(false);
    setEditIndex(null);
  };

  // Fix: Reset form when clicking "Add More"
  const handleAddMoreClick = () => {
    if (showForm) {
      // If form is already open, close it
      setShowForm(false);
      setFormData({ game: "", place: "", date: "" });
      setEditIndex(null);
    } else {
      // Open form with empty fields
      setShowForm(true);
      setFormData({ game: "", place: "", date: "" });
      setEditIndex(null);
    }
  };
  

  return (
    <section
      id="sports"
      ref={ref}
      className={`w-full max-w-6xl mx-auto mt-24 px-5 relative transition-all duration-1000 ease-in-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>⚽</span>
        <span>SPORTS</span>
      </button>

      <h1 className="text-5xl font-bold text-[#1F509A] text-center mt-20 pt-8">
        Sports Achievements
      </h1>

      <div className="overflow-x-auto mt-8 border-2 border-[#1F509A] p-1">
        <table className="w-full border-collapse text-center border border-[#1F509A]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-800 font-bold px-4 py-2 text-lg">Game</th>
              <th className="border border-gray-800 px-4 py-2 text-lg">Place</th>
              <th className="border border-gray-800 px-4 py-2 text-lg">Date</th>
            </tr>
          </thead>
          <tbody>
            {sportsData.map((sport, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handleRowClick(index)}
              >
                <td className="border border-gray-800 font-bold px-4 py-2 text-lg">
                  {sport.game}
                </td>
                <td className="border border-gray-800 italic px-4 py-2 text-lg">
                  {sport.place}
                </td>
                <td className="border border-gray-800 px-4 py-2 text-lg">
                  {sport.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fix: Show an empty form when clicking "Add More" */}
      <button
        onClick={handleAddMoreClick}
        className="mt-6 bg-[#1F509A] text-lg text-white font-semibold px-4 py-2 rounded-md hover:bg-[#d67a3b] transition w-full"
      >
        {showForm ? "Cancel" : "Add More"}
      </button>

      {showForm && (
        <div className="mt-6 border border-gray-400 p-6 rounded-md shadow-md bg-white">
          <h2 className="text-2xl font-semibold mb-4">
            {editIndex !== null ? "Edit Achievement" : "Add New Achievement"}
          </h2>
          <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="game"
              value={formData.game}
              onChange={handleInputChange}
              placeholder="Game"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              placeholder="Place"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="Date"
              className="border p-2 rounded-md"
            />
            <div className="flex flex-col space-y-4">
              {editIndex !== null && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 text-lg text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition w-full"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="bg-[#1F509A] text-lg text-white font-semibold px-4 py-2 rounded-md hover:bg-[#163F7A] transition w-full"
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}

      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </section>
  );
};

export default Sports;
