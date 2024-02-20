import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { supabase } from '../config/client'

const Cards = () => {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [showPopup, setShowPopup] = useState(false)

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

  const allergens = [
    { name: 'lupin', label: 'Lupin' },
    { name: 'soya', label: 'Soya' },
    { name: 'egg', label: 'Egg' },
    { name: 'fish', label: 'Fish' },
    { name: 'crustacean', label: 'Crustacean' },
    { name: 'molluscs', label: 'Molluscs' },
    { name: 'celery', label: 'Celery' },
    { name: 'peanuts', label: 'Peanuts' },
    { name: 'sesame_seed', label: 'Sesame Seed' },
    { name: 'sulphur_dioxide', label: 'Sulphur Dioxide' },
    { name: 'vegetarian', label: 'Vegetarian' },
    { name: 'vegan', label: 'Vegan' },
    { name: 'halal', label: 'Halal' },
    { name: 'milk', label: 'Milk' },
    { name: 'mustard', label: 'Mustard' },
  ]

  return (
    <div className="w-full bg-gray-100 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <img
                src={recipe.image || 'https://placeholder.com/300'}
                alt=""
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500" />
                <p className="text-sm ml-1 text-gray-400">
                  {recipe.rating || 'N/A'}
                </p>
              </div>
              <p className="text-gray-500 flex-grow mb-4">
                {recipe.description || 'No description available'}
              </p>
              <button
                onClick={() => {
                  setSelectedRecipe(recipe)
                  setShowPopup(true)
                }}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 self-end"
              >
                Read More
              </button>
              {/* Popup */}
              {showPopup && selectedRecipe && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg w-full md:w-1/2">
                    <h2 className="text-lg md:text-xl lg:text-2xl text-gray-700 font-bold text-left mb-5">
                      What ingredients does {selectedRecipe.name} contain?
                    </h2>
                    {selectedRecipe.nuts && selectedRecipe.nuts.length > 0 && (
                      <p className="text-gray-500 mb-4">
                        Nuts: {selectedRecipe.nuts.join(', ') || 'N/A'}
                      </p>
                    )}
                    {selectedRecipe.cereals &&
                      selectedRecipe.cereals.length > 0 && (
                        <p className="text-gray-500 mb-4">
                          Cereals: {selectedRecipe.cereals || 'N/A'}
                        </p>
                      )}
                    {allergens.filter(
                      (allergen) => selectedRecipe[allergen.name],
                    ).length > 0 && (
                      <p className="text-gray-500 mb-4">
                        Other allergens:{' '}
                        {allergens
                          .filter((allergen) => selectedRecipe[allergen.name])
                          .map((allergen) => allergen.label)
                          .join(', ') || 'N/A'}
                      </p>
                    )}
                    <button
                      onClick={() => {
                        setSelectedRecipe({})
                        setShowPopup(false)
                      }}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
