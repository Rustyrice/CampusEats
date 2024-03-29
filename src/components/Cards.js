import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { supabase } from '../config/client'
import { getUserMeals } from '../services/homeServices'
import { Transition } from '@headlessui/react'

const Cards = ({ enabled }) => {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [value, setValue] = useState(0)
  const [ratings, setRatings] = useState({})
  const [hoveredRating, setHoveredRating] = useState(null)
  const [submittingRating, setSubmittingRating] = useState(false)
  const [ratingSum, setRatingSum] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [dishRatings, setDishRatings] = useState({})

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setSelectedRecipe({})
        setShowPopup(false)
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  useEffect(() => {
    const fetchRecipes = async () => {
      // Get the current user
      const user = await supabase.auth.getUser()
      console.log('Current User:', user)

      if (user && user.data && user.data.user) {
        // Get the user's ID
        const userId = user.data.user.id

        // checking user id vlaue
        console.log('Fetching meals for user ID:', userId)

        let meals
        if (enabled) {
          const { data, error } = await supabase
            .from('fountain_allergens')
            .select('*')
          if (error) {
            console.log('Error fetching all meals', error.message)
            return
          }
          meals = data
        } else {
          const { data: safeMeals, error } = await getUserMeals(userId)
          if (error) {
            console.log('Error fetching safe meals', error.message)
            return
          }
          meals = safeMeals
        }

        console.log('Fetched meals:', meals)
        setRecipes(meals)
      }
    }

    fetchRecipes()
  }, [enabled])

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
    { name: 'milk', label: 'Milk' },
    { name: 'mustard', label: 'Mustard' },
  ]

  const handleMouseEnter = (newRating) => {
    setHoveredRating(newRating)
  }

  const handleMouseLeave = () => {
    setHoveredRating(null)
  }

  const handleRatingClick = async (selectedRating) => {
    const user = await supabase.auth.getUser()
    const userRating = dishRatings[selectedRecipe.id]?.[user.id] || 0

    const newRatings = { ...dishRatings }
    const newRatingSum =
      (newRatings[selectedRecipe.id]?.sum || 0) + selectedRating
    const newRatingCount = (newRatings[selectedRecipe.id]?.count || 0) + 1

    newRatings[selectedRecipe.id] = {
      sum: newRatingSum,
      count: newRatingCount,
      rating: selectedRating,
    }

    setValue(selectedRating)
    setDishRatings(newRatings)

    // Recalculate and update average rating
    setRatingSum(newRatingSum)
    setRatingCount(newRatingCount)
    // Update the average rating in your ratings state
    setRatings({
      ...ratings,
      [selectedRecipe.id]: { sum: newRatingSum, count: newRatingCount },
    })
  }

  const handleSubmitRating = async () => {
    setSubmittingRating(true)

    const user = await supabase.auth.getUser()
    console.log('Current User:', user) // Log the current user object

    if (user) {
      // Get the user's ID
      const user_id = user.data.user.id

      // checking user id vlaue
      console.log('Fetching meals for user ID:', user_id)

      // Fetch the user from the users table to get the userId
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id') // or any other fields you need
        .eq('id', user_id)

      if (userError) {
        console.log('Error fetching user data', userError.message)
        return
      }

      console.log('Fetched User Data:', userData)

      const userId = userData[0]?.id

      console.log('User ID from Users Table:', userId)

      // await fetchRatings()

      const selectedRating = dishRatings[selectedRecipe.id]?.rating || 0

      console.log('Rating Data:', selectedRating)

      // Insert the rating into the ratings table
      const { data, error } = await supabase
        .from('fountain_allergens_ratings')
        .upsert(
          [
            {
              dish_id: selectedRecipe.id,
              user_id: userId,
              rating: selectedRating,
            },
          ],
          { onConflict: ['dish_id', 'user_id'] },
        )

      if (error) {
        console.log('Error submitting rating', error.message)
      } else {
        console.log('Rating submitted successfully', data)
        alert('Rating submitted successfully!')
      }
    }
    setSubmittingRating(false)
  }

  const calculateAverageRating = (dishId) => {
    const dishRatingData = dishRatings[dishId]
    console.log('dishId:', dishId)
    console.log('Dish Rating Data:', dishRatingData)

    // Check if there are ratings for the specified dish
    if (dishRatingData) {
      const count = dishRatingData.count
      const sum = dishRatingData.sum

      // Calculate the average rating
      if (count > 0) {
        return sum / count
      }
    }

    // Default to 0 if there are no ratings
    return 0
  }

  return (
    <div className="w-full bg-gray-100 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes &&
            recipes.length > 0 &&
            recipes.map((recipe) => (
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
                    {calculateAverageRating(recipe.id).toFixed(1) || 'N/A'}
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
                      {selectedRecipe.nuts &&
                        selectedRecipe.nuts.length > 0 && (
                          <p className="text-gray-500 mb-4">
                            Nuts: {selectedRecipe.nuts.join(', ') || 'N/A'}
                          </p>
                        )}
                      {selectedRecipe.cereals &&
                        selectedRecipe.cereals.length > 0 && (
                          <p className="text-gray-500 mb-4">
                            Cereals:{' '}
                            {selectedRecipe.cereals ||
                              'Does not contain cereals'}
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
                      <p className="text-gray-500 mb-4">
                        Vegetarian: {selectedRecipe.vegetarian ? 'Yes' : 'No'}
                      </p>
                      <p className="text-gray-500 mb-4">
                        Vegan: {selectedRecipe.vegan ? 'Yes' : 'No'}
                      </p>
                      <p className="text-gray-500 mb-4">
                        Halal: {selectedRecipe.halal ? 'Yes' : 'No'}
                      </p>
                      {/* rating system */}
                      <div className="flex flex-col items-center mt-5 mb-3">
                        <h3 className="text-md md:text-lg lg:text-xl text-gray-700 font-bold mt-5 mb-2">
                          Tried this dish? Give it some feedback!
                        </h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <div
                              key={index}
                              className="relative cursor-pointer md:mx-1 lg:mx-2 xl:mx-3"
                              onMouseEnter={() => handleMouseEnter(index + 1)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleRatingClick(index + 1)}
                            >
                              <FaStar
                                className={`w-6 h-6 ${
                                  (index + 1 <= value ||
                                    index + 1 <= hoveredRating) &&
                                  'text-yellow-500'
                                }`}
                              />
                              <Transition
                                show={index + 1 === hoveredRating}
                                enter="transform transition duration-200"
                                enterFrom="scale-75 opacity-0"
                                enterTo="scale-100 opacity-100"
                                leave="transform duration-100 transition"
                                leaveFrom="scale-100 opacity-100"
                                leaveTo="scale-75 opacity-0"
                              ></Transition>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 md:mt-3 lg:mt-4 xl:mt-5">
                          <button
                            onClick={handleSubmitRating}
                            disabled={submittingRating}
                            className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition duration-300"
                          >
                            {submittingRating ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>
                      </div>
                      <div>
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
                  </div>
                )}
              </div>
            ))}{' '}
          {/* removed a curly bracket */}
          {recipes.length === 0 && (
            <div className="text-center py-4">Loading recipes...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cards
