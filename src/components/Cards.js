import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { supabase } from '../config/client'

const Cards = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    // fetch data from supabase
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('fountain_allergens')
        .select('*')

      if (error) {
        console.log('error fetching recipes', error.message)
      } else {
        setRecipes(data)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div className="w-full bg-gray-100 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={recipe.image || 'https://placeholder.com/300'}
                alt=""
                className="w-full h-32 object-cover rounded-md"
              />
              <h2 className="text-2xl font-bold mb-2">{recipe.product}</h2>
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500" />
                <p className="text-sm ml-1 text-gray-400">
                  {recipe.rating || 'N/A'}
                </p>
              </div>
              <p className="text-gray-500 mb-4">
                {recipe.description || 'No description available'}
              </p>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
