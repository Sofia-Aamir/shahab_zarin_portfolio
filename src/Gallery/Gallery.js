import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const largeImages = ["./Images/2.jpg", "./Images/3.jpg", "./Images/7.jpg", "./Images/6.jpg"];
const initialImages = [
  "./Images/1.jpg", "./Images/2.jpg", "./Images/3.jpg", "./Images/4.jpg",
  "./Images/5.jpg", "./Images/6.jpg", "./Images/7.jpg", "./Images/8.jpg",
  "./Images/9.jpg", "./Images/10.jpg", "./Images/11.jpg", "./Images/12.jpg"
];

const Gallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState(0);
  const [thumbnailsToShow, setThumbnailsToShow] = useState(4);
  const [smallImages, setSmallImages] = useState([...initialImages]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ imageUrl: "", file: null });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const updateThumbnails = () => {
      setThumbnailsToShow(window.innerWidth < 768 ? 2 : 4);
    };
    updateThumbnails();
    window.addEventListener("resize", updateThumbnails);
    return () => window.removeEventListener("resize", updateThumbnails);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % largeImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextThumbnails = () => {
    setVisibleThumbnails((prev) => (prev + thumbnailsToShow) % smallImages.length);
  };

  const prevThumbnails = () => {
    setVisibleThumbnails((prev) => (prev - thumbnailsToShow + smallImages.length) % smallImages.length);
  };

  const handleAddMoreClick = () => {
    setShowForm(!showForm);
    setFormData({ imageUrl: "", file: null });
    setEditIndex(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file, imageUrl: "" });
  };

  const handleUrlChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.value, file: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newImage = formData.imageUrl || URL.createObjectURL(formData.file);
    if (editIndex !== null) {
      smallImages[editIndex] = newImage;
    } else {
      setSmallImages([...smallImages, newImage]);
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    setSmallImages(smallImages.filter((_, i) => i !== editIndex));
    setShowForm(false);
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className={`w-full max-w-6xl mx-auto mt-24 px-5 relative transition-all duration-1000 ease-in-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
            <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>📸</span>
        <span>GALLERY</span>
      </button>
      <h1 className="text-5xl font-bold text-[#1F509A] text-center mt-20 pt-8">Gallery</h1>
      
      <div className="mt-8 w-full flex justify-center">
        <img src={largeImages[currentIndex]} alt="Gallery Display" className="w-full max-w-2xl h-[450px] object-cover rounded-lg shadow-lg" />
      </div>

      <div className="mt-6 flex items-center justify-center relative w-full">
        <button onClick={prevThumbnails} className="absolute left-0 bg-[#1F509A] text-white p-3 rounded-full shadow-md hover:bg-[#d67a3b]">
          <FaArrowLeft size={15} />
        </button>

        <div className="flex overflow-hidden w-[85%] space-x-4 justify-center">
          {smallImages.slice(visibleThumbnails, visibleThumbnails + thumbnailsToShow).map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Thumbnail"
              className="w-40 h-40 object-cover rounded-md cursor-pointer hover:opacity-75"
              onClick={() => {
                setEditIndex(index);
                setShowForm(true);
                setFormData({ imageUrl: src, file: null });
              }}
            />
          ))}
        </div>

        <button onClick={nextThumbnails} className="absolute right-0 bg-[#1F509A] text-white p-3 rounded-full shadow-md hover:bg-[#d67a3b]">
          <FaArrowRight size={15} />
        </button>
      </div>

      <button onClick={handleAddMoreClick} className="mt-6 bg-[#1F509A] text-white px-4 py-2 rounded-md w-full">
        {showForm ? "Cancel" : "Add More"}
      </button>

      {showForm && (
        <div className="mt-6 border border-gray-400 p-6 rounded-md shadow-md bg-white">
          <h2 className="text-2xl font-semibold mb-4">{editIndex !== null ? "Edit Image" : "Add New Image"}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input type="file" onChange={handleImageChange} className="border p-2 rounded-md" />
            <input type="text" value={formData.imageUrl} onChange={handleUrlChange} placeholder="Enter Image URL" className="border p-2 rounded-md" />
            <div className="flex flex-col space-y-4">
              {editIndex !== null && (
                <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              )}
              <button type="submit" className="bg-[#1F509A] text-white px-4 py-2 rounded-md">{editIndex !== null ? "Update" : "Add"}</button>
            </div>
          </form>
        </div>
      )}
        <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </section>
  );
};

export default Gallery;
