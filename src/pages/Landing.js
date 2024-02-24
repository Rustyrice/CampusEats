import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImage from '../../src/assets/landing_background_image.jpg'

const Landing = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen flex flex-col justify-start items-start text-white p-5"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 w-full h-full p-5">
        <div className="relative z-10 text-3xl sm:text-5xl font-bold mb-7 mt-10 sm:mt-5">
          Discover <br />
          Mindful Eating
        </div>

        <div className="text-sm sm:text-lg mt-4">
          Say goodbye to the stress of finding <br />
          safe meals on campus and embark on a <br />
          culinary journey that aligns perfectly
          <br />
          with your dietary needs.
        </div>

        <Link
          to="/auth"
          className="relative z-10 inline-block bg-green-500 text-white py-2 px-4 mt-6 sm:mt-4 font-bold rounded"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default Landing
