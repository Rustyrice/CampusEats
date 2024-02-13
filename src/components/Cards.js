import React from 'react'
import { FaStar } from 'react-icons/fa'

const Cards = () => {
  return (
    <div className="w-full bg-gray-100 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://www.thelastfoodblog.com/wp-content/uploads/2020/09/veg-rogan-josh-overhead-close-up-in-pan.jpg"
              alt=""
              className="w-full h-32 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2">Vegan Rogan Josh</h2>
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-500" />
              <p className="text-sm ml-1 text-gray-400">2.3</p>
            </div>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              nec.
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              Read More
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://www.thevegspace.co.uk/wp-content/uploads/2022/04/FV-Insta-1-1.jpg"
              alt=""
              className="w-full h-32 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2">Vegan Hotdog</h2>
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-500" />
              <p className="text-sm ml-1 text-gray-400">4.9</p>
            </div>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              nec.
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              Read More
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://www.eatingwell.com/thmb/AZdGSagOj8VtZPnpcVdD8ttRk3k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-lentil-stew-0b016185b40446ba98409c75dfeaef7f.jpg"
              alt=""
              className="w-full h-32 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2">Vegan Lentil Stew</h2>
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-500" />
              <p className="text-sm ml-1 text-gray-400">3.8</p>
            </div>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              nec.
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              Read More
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://www.eatingwell.com/thmb/AZdGSagOj8VtZPnpcVdD8ttRk3k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-lentil-stew-0b016185b40446ba98409c75dfeaef7f.jpg"
              alt=""
              className="w-full h-32 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2">Lorem Ipsum</h2>
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-500" />
              <p className="text-sm ml-1 text-gray-400">3.2</p>
            </div>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              nec.
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              Read More
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://www.eatingwell.com/thmb/AZdGSagOj8VtZPnpcVdD8ttRk3k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-lentil-stew-0b016185b40446ba98409c75dfeaef7f.jpg"
              alt=""
              className="w-full h-32 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2">Lorem Ipsum</h2>
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-500" />
              <p className="text-sm ml-1 text-gray-400">3.2</p>
            </div>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              nec.
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
