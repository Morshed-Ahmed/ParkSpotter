
const HeroSection = () => {
  return (
    <div className="mt-20 mb-10 flex flex-col md:flex-row w-full md:w-10/12 mx-auto">
      <div className="w-full md:w-3/6 flex flex-col justify-center items-center md:items-start">
        <h1 className="mb-10 text-3xl md:text-4xl font-bold text-center md:text-left md:mb-4 ">
          Everything for your car
        </h1>
        <p className="mb-2 text-lg md:text-lg pt-2 md:pt-8 font-medium text-center md:text-left">
          Begin your car journey with ParkSpotter and say goodbye to all your
          car-related worries - one service at a time
        </p>
      </div>
      <div className="w-full md:w-3/6 mt-4 md:mt-0">
        <img
          className="h-48 md:h-full w-full object-cover"
          src="./image_4_a7c45621d6.png"
          alt="..."
        />
      </div>
    </div>
  )
}

export default HeroSection
