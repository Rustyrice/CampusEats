import React from 'react'
import { Link } from 'react-router-dom';


const DietarySelectionPage1 = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="">
        <img src="/img/background_shape.svg" alt="green-bar" className="mt-24"/>
        <p className="absolute top-48 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">CampusEats</p>
      </div>

      <div className="font-bold text-3xl flex flex-col items-center">
        <h2 >
          Welcome to
        </h2>
        <h2 >
          CampusEats!
        </h2>
      </div>
      
      <div className="flex flex-col items-center my-12 font-medium">
        <p>
          Follow the steps to find your 
        </p>
        <p>
          perfect meal on campus
        </p>
      </div>
      
      <Link to="/home" className="rounded-md bg-green-500 p-2 px-10 text-white">
        Start 
      </Link>
    </div>
    
  )
}




export default DietarySelectionPage1