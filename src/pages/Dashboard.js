import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import PopUp from '../components/PopUp';
import ingredientService from "../services/ingredientService";
import SelectionBox from "../components/SelectionBox";

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMeal, setNewMeal] = useState({ name: "", description: "" });
  const [addButton, setAddButton] = useState(false);
  
  const updatePreferences = (val) => {
    setNewMeal(prevState => ({
      ...prevState,
      [val]: !prevState[val],
    }));
  };

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
      setMeals([...meals, newMeal]); 
      setAddButton(false); 
      setNewMeal({ name: "", description: "" }); 
    } catch (error) {
      console.error("Failed to add meal:", error);
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
          <div className = "w-96 h-96 overflow-y-auto"> 
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
              <div className="flex flex-col justify-center ml-5 mr-5 content-center">
                <SelectionBox
                  desc="Halal"
                  onClick={() => updatePreferences("halal")}
                  checked={newMeal.halal}
                />
                <SelectionBox
                  desc="Vegetarian"
                  onClick={() => updatePreferences("vegetarian")}
                  checked={newMeal.vegetarian}
                />
                <SelectionBox
                  desc="Vegan"
                  onClick={() => updatePreferences("vegan")}
                  checked={newMeal.vegan}
                />
                <SelectionBox
                desc="Lupin"
                checked={newMeal.lupin}
                onClick={() => updatePreferences("lupin")}
                />
                <SelectionBox
                  desc="Soya"
                  checked={newMeal.soya}
                  onClick={() => updatePreferences("soya")}
                />
                <SelectionBox
                  desc="Egg"
                  checked={newMeal.egg}
                  onClick={() => updatePreferences("egg")}
                />
                <SelectionBox
                  desc="Milk"
                  checked={newMeal.milk}
                  onClick={() => updatePreferences("milk")}
                />
                <SelectionBox
                  desc="Fish"
                  checked={newMeal.fish}
                  onClick={() => updatePreferences("fish")}
                />
                <SelectionBox
                  desc="Crustaceans"
                  checked={newMeal.crustaceans}
                  onClick={() => updatePreferences("crustaceans")}
                />
                <SelectionBox
                  desc="Molluscs"
                  checked={newMeal.molluscs}
                  onClick={() => updatePreferences("molluscs")}
                />
                <SelectionBox
                  desc="Mustard"
                  checked={newMeal.mustard}
                  onClick={() => updatePreferences("mustard")}
                />
                <SelectionBox
                  desc="Celery"
                  checked={newMeal.celery}
                  onClick={() => updatePreferences("celery")}
                />
                <SelectionBox
                  desc="Peanuts"
                  checked={newMeal.peanuts}
                  onClick={() => updatePreferences("peanuts")}
                />
                <SelectionBox
                  desc="Sesame Seeds"
                  checked={newMeal.sesame_seeds}
                  onClick={() => updatePreferences("sesame_seeds")}
                />
                <SelectionBox
                  desc="Sulphur Dioxide"
                  checked={newMeal.sulphur_dioxide}
                  onClick={() => updatePreferences("sulphur_dioxide")}
                />
              </div>
              <button type="submit" className="bg-green-400 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-2"> Add Meal </button>
            </form>
            </div>
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
