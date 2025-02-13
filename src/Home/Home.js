import React from "react";
import { useInView } from "react-intersection-observer";

const Home = ({ scrollToContact }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      id="home"
      ref={ref}
      className={`min-h-screen flex flex-col justify-center items-center text-center px-6 relative mt-12 transition-all duration-1000 ease-in-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button className="absolute top-6 lg:top-10 left-4 flex items-center space-x-2 text-gray-800 text-lg font-semibold border-2 border-gray-800 rounded-full px-4 py-2 hover:text-gray-600 transition">
        <span>🏠</span>
        <span>INTRODUCE</span>
      </button>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1F509A]">
        Hi , I am <span className="text-[#E38E49]">Shahab</span>
      </h1>

      <h2 className="text-3xl mt-4 text-gray-700">
        Lecturer, <span className="text-[#1F509A]">Computer Science</span>
      </h2>

      <h3 className="text-2xl text-gray-600 mt-2">
        Comsats University Islamabad, Abbottabad Campus
      </h3>

      <p className="mt-6 text-lg max-w-3xl text-gray-700 leading-relaxed">
        With a decade of experience in teaching and research, I specialize in computer science, guiding students and contributing to AI, Machine Learning, and Web Development. Passionate about innovation, I strive to foster critical thinking and technical expertise.
      </p>

      {/* Updated Button to Scroll to Contact */}
      <button
        onClick={scrollToContact}
        className="mt-8 px-8 py-3 text-xl font-bold bg-[#E38E49] text-white rounded-full shadow-lg hover:bg-[#1F509A] transition"
      >
        Let's Connect!
      </button>

      <hr className="w-full border-t-2 border-[#E38E49] mt-12" />
    </div>
  );
};

export default Home;
