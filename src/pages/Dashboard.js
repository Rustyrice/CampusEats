import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import PopUp from '../components/PopUp';
import ingredientService from "../services/ingredientService";

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMeal, setNewMeal] = useState({ name: "", description: "" });
  const [addButton, setAddButton] = useState(false);
  
  const getMeals = async () => {
    try {
      const meals = await ingredientService.fetchMeals();
      setMeals(meals);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }
  };

  useEffect(() => {
    getMeals();
  }, [meals]);

  const handleDeleteMeal = async (id) => {
    try {
      await ingredientService.deleteMeal(id);
      setMeals(meals.filter(meal => meal.id !== id));
    } catch (error) {
      console.error("Failed to delete meal:", error);
    }
  };

  const addNewMeal = async () => {
    try {
      await ingredientService.addMeal(newMeal);
      setMeals([...meals, newMeal]); // Update meals state with the new meal
      setAddButton(false); // Close the popup after adding the meal
      setNewMeal({ name: "", description: "" }); // Clear the newMeal state
    } catch (error) {
      console.error("Failed to add meal:", error);
      // Handle error if needed
    }
  };

  const handleNameChange = (event) => {
    setNewMeal({ ...newMeal, name: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setNewMeal({ ...newMeal, description: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewMeal();
  };

  const getFilteredMeals = (searchQuery, meals) => {
    if (!searchQuery || typeof searchQuery !== 'string') {
      return meals;
    }
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return meals.filter(meal => meal.name.toLowerCase().includes(lowerCaseSearchQuery))
  }

  const filteredMeals = getFilteredMeals(searchQuery, meals);

  return (
    <>
      <Navbar />
      <div  className='space mt-1'> 
        <div className="w-full bg-white-100 py-20"> 
          <div className='flex justify-between items-center mb-4 ml-4 mr-4'>
            <input
              type="text"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-4 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
            />
            <button onClick={getFilteredMeals} className="bg-green-400 hover:bg-green-700 text-white py-2 px-4 ml-2 rounded-lg">
              Search 
            </button>
            <div className='add bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2 text-xl'>
              <button onClick={() => setAddButton(true)}> + </button>
            </div>
          </div>
      
          <PopUp trigger={addButton} onClose={() => setAddButton(false)}> 
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={newMeal.name}
                onChange={handleNameChange}
                className="w-full h-10 px-4 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
              />
              <textarea
                placeholder="Description"
                value={newMeal.description}
                onChange={handleDescriptionChange}
                className="w-full h-20 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none mt-2"
              />
              <button type="submit" className="bg-green-400 hover:bg-green-700 text-white py-2 px-4 rounded-lg"> Add Meal </button>
            </form>
          </PopUp>

          <div className='recipes-container gap-5 ml-1/4'>
            {filteredMeals.map((meal, index) => (
              <RecipeCard
                key={index}
                meal={meal}
                onDelete={() => handleDeleteMeal(meal.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
