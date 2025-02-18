import { useInView } from "react-intersection-observer"

const Home = ({ scrollToContact }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="home"
      ref={ref}
      className={`relative flex min-h-screen flex-col items-center justify-center px-6 transition-all duration-1000 ease-in-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button className="absolute left-4 top-6 flex items-center space-x-2 rounded-full border-2 border-gray-800 px-4 py-2 text-lg font-semibold text-gray-800 transition hover:text-gray-600 lg:top-10">
        <span>🏠</span>
        <span>INTRODUCE</span>
      </button>

      <div className="flex flex-col items-center space-y-4 mt-[-170px]">
  <h1 className="text-4xl font-bold text-[#1F509A] sm:text-5xl md:text-6xl">
    Hi, I am <span className="text-[#E38E49]">Shahab</span>
  </h1>

  <h2 className="text-3xl text-gray-700">
    Lecturer, <span className="text-[#1F509A]">Computer Science</span>
  </h2>

  <h3 className="text-2xl text-gray-600">Comsats University Islamabad, Abbottabad Campus</h3>

  <button
    onClick={scrollToContact}
    className="mt-8 rounded-full bg-[#E38E49] px-8 py-3 text-xl font-bold text-white shadow-lg transition hover:bg-[#1F509A]"
  >
    Let's Connect!
  </button>
</div>


      <hr className="absolute w-full border-t-2 border-[#E38E49] mt-[120px]" />
    </section>
  )
}

export default Home

