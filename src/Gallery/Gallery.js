import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const initialImages = {
  sports: {
    large: ["../Images/2.jpg", "../Images/3.jpg", "../Images/7.jpg"],
    small: ["../Images/2.jpg", "../Images/3.jpg", "../Images/7.jpg", "./Images/6.jpg"],
  },
  academic: {
    large: ["./Images/1.jpg", "./Images/4.jpg", "./Images/5.jpg"],
    small: ["./Images/1.jpg", "./Images/4.jpg", "./Images/5.jpg", "./Images/8.jpg"],
  },
};

const Gallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [categories, setCategories] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState({ sports: 0, academic: 0 });
  const [visibleThumbnails, setVisibleThumbnails] = useState({ sports: 0, academic: 0 });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ category: "sports", imageUrl: "", file: null });
  const [editIndex, setEditIndex] = useState(null);
  const [editType, setEditType] = useState(null); // 'large' or 'small'
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => ({
        sports: (prev.sports + 1) % categories.sports.large.length,
        academic: (prev.academic + 1) % categories.academic.large.length,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [categories]);

  const nextThumbnails = (category) => {
    setVisibleThumbnails((prev) => ({
      ...prev,
      [category]: (prev[category] + 2) % categories[category].small.length,
    }));
  };

  const prevThumbnails = (category) => {
    setVisibleThumbnails((prev) => ({
      ...prev,
      [category]: (prev[category] - 2 + categories[category].small.length) % categories[category].small.length,
    }));
  };

  const handleAddMoreClick = () => {
    setShowForm(!showForm);
    setFormData({ category: "sports", imageUrl: "", file: null });
    setEditIndex(null);
    setEditType(null);
    setCroppedImageUrl(null);
    setCrop({ aspect: 16 / 9 });
    setImagePreviewUrl(null); // Reset image preview
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newImage = croppedImageUrl || formData.imageUrl || URL.createObjectURL(formData.file);
    setCategories((prev) => {
      const updated = { ...prev };
      if (editIndex !== null) {
        updated[formData.category][editType][editIndex] = newImage;
      } else {
        if (editType === "large") {
          updated[formData.category].large.push(newImage);
        } else {
          updated[formData.category].small.push(newImage);
        }
      }
      return updated;
    });
    setShowForm(false);
    setImagePreviewUrl(null); // Reset image preview after submission
  };

  const handleDelete = () => {
    setCategories((prev) => {
      const updated = { ...prev };
      updated[formData.category][editType] = updated[formData.category][editType].filter((_, i) => i !== editIndex);
      return updated;
    });
    setShowForm(false);
  };

  const handleImageClick = (category, index, type) => {
    setEditIndex(index);
    setShowForm(true);
    setFormData({ category, imageUrl: categories[category][type][index], file: null });
    setEditType(type);
    setCroppedImageUrl(null);
    setCrop({ aspect: 16 / 9 });
    setImagePreviewUrl(categories[category][type][index]); // Set image preview for editing
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    setCroppedImageUrl(null);
    setCrop({ aspect: 16 / 9 });
    
    // Create a preview URL for the selected image
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  };

  const handleImageLoad = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const cropX = crop.x * image.naturalWidth;
    const cropY = crop.y * image.naturalHeight;
    const cropWidth = crop.width * image.naturalWidth;
    const cropHeight = crop.height * image.naturalHeight;

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    setCroppedImageUrl(canvas.toDataURL());
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className={`w-full max-w-6xl mx-auto mt-24 px-5 transition-all duration-1000 ease-in-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button
        className="absolute left-4 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition"
        style={{ top: "-20px" }}
      >
        <span>📸</span>
        <span>Gallery</span>
      </button>
      <h1 className="text-5xl font-bold text-[#1F509A] text-center mt-20 pt-8">Gallery</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {Object.keys(categories).map((category) => (
          <div key={category} className="flex flex-col items-center">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">{category.toUpperCase()}</h2>
            <div className="relative w-full max-w-lg h-[300px]">
              {categories[category].large.map((src, index) => (
                <img
                  key={index}
                  src={src || "/placeholder.svg"}
                  alt={`${category} ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-500 ${
                    index === currentIndex[category] ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={() => handleImageClick(category, index, "large")}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center relative w-full justify-center">
              <button
                onClick={() => prevThumbnails(category)}
                className="absolute left-0 bg-[#1F509A] text-white p-3 rounded-full shadow-md hover:bg-[#d67a3b]"
                aria-label="Previous thumbnails"
              >
                <FaArrowLeft size={15} />
              </button>
              <div className="flex overflow-hidden w-[85%] space-x-4 justify-center">
                {categories[category].small
                  .slice(visibleThumbnails[category], visibleThumbnails[category] + 2)
                  .map((src, index) => (
                    <img
                      key={index}
                      src={src || "/placeholder.svg"}
                      alt={`${category} thumbnail ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-md cursor-pointer hover:opacity-75"
                      onClick={() => handleImageClick(category, index, "small")}
                    />
                  ))}
              </div>
              <button
                onClick={() => nextThumbnails(category)}
                className="absolute right-0 bg-[#1F509A] text-white p-3 rounded-full shadow-md hover:bg-[#d67a3b]"
                aria-label="Next thumbnails"
              >
                <FaArrowRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAddMoreClick} className="mt-10 bg-[#1F509A] text-white px-4 py-2 rounded-md w-full">
        {showForm ? "Cancel" : "Add More"}
      </button>
      {showForm && (
        <div className="mt-6 border border-gray-400 p-6 rounded-md shadow-md bg-white w-full">
          <h2 className="text-2xl font-semibold mb-4">{editIndex !== null ? "Edit Image" : "Add New Image"}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border p-2 rounded-md"
            >
              <option value="sports">Sports</option>
              <option value="academic">Academic</option>
            </select>
            <select value={editType} onChange={(e) => setEditType(e.target.value)} className="border p-2 rounded-md">
              <option value="large">Large Image</option>
              <option value="small">Small Image</option>
            </select>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 rounded-md"
              accept="image/*"
            />
            {imagePreviewUrl && (
              <ReactCrop
                src={imagePreviewUrl}
                crop={crop}
                onImageLoaded={(image) => handleImageLoad(image)}
                onComplete={(c) => setCrop(c)}
                onChange={(newCrop) => setCrop(newCrop)}
              />
            )}
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value, file: null })}
              placeholder="Enter Image URL"
              className="border p-2 rounded-md"
            />
            {editIndex !== null && (
              <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
                Delete
              </button>
            )}
            <button type="submit" className="bg-[#1F509A] text-white px-4 py-2 rounded-md">
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </form>
        </div>
      )}
      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </section>
  );
};

export default Gallery;