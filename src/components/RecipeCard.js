import React, { useState } from "react";
import PopUp from "./PopUp";
import ingredientService from "../services/ingredientService";
import SelectionBox from "../components/SelectionBox";


export default function RecipeCard({ meal, onDelete }) {
  const [editedMeal, setEditedMeal] = useState(meal);
  const [editButton, setEditButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  
  const handleDeleteClick = async () => {
    try {
      await ingredientService.deleteMeal(meal.id);
      onDelete();
      setDeleteButton(false);
    } catch (error) {
      console.error("Failed to delete meal:", error);
    }
  };

  const handleDeletePopUp = () => {
    setDeleteButton(true); 
  }

  const handleEditClick = () => {
    setEditButton(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await ingredientService.updateMeal(meal.id, editedMeal); // Update meal with editedMeal
      setEditButton(false);
    } catch (error) {
      console.error("Failed to edit meal:", error);
    }
  };

  const handleNameChange = (e) => {
    setEditedMeal({ ...editedMeal, name: e.target.value }); // Update editedMeal
  };

  const handleDescriptionChange = (e) => {
    setEditedMeal({ ...editedMeal, description: e.target.value }); // Update editedMeal
  };

  const updatePreferences = (val) => {
    setEditedMeal((prevState) => ({
      ...prevState,
      [val]: !prevState[val],
    }));
  };


  return (
    <div className="recipe-card rounded-lg overflow-hidden shadow-md ml-3 mr-3 mb-4 bg-white-100">
      <div className="p-2">
        <p className="name text-lg font-bold mb-1 ml-3">{meal.name}</p>
        <p className="desc text-sm mb-2 text-gray-600 ml-3">{meal.description}</p>
        <div className="flex justify-end">
          <button onClick={handleEditClick} className="bg-green-400 hover:bg-green-700 text-white py-2 px-4 rounded mr-2">
            Edit
          </button>
          <button onClick={handleDeletePopUp} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
            Delete
          </button>

          <PopUp trigger={deleteButton} onClose={() => setDeleteButton(false)}>
            Are you sure you want to delete this item?
            <button onClick = {handleDeleteClick} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-4">
            Yes, Delete
          </button>

          </PopUp>
        </div>
        <PopUp trigger={editButton} onClose={() => setEditButton(false)}>
        <div className = "w-96 h-96 overflow-y-auto"> 
          <form onSubmit={handleEditSubmit} className="p-4">
            <input
              type="text"
              placeholder="Name"
              value={editedMeal.name}
              onChange={handleNameChange}
              className="w-full h-10 px-4 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none mb-4"
            />
            <textarea
              placeholder="Description"
              value={editedMeal.description}
              onChange={handleDescriptionChange}
              className="w-full h-20 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
            />
            <div className="flex flex-col justify-center ml-5 mr-5 content-center">
                <SelectionBox
                  desc="Halal"
                  onClick={() => updatePreferences("halal")}
                  checked={editedMeal.halal}
                />
                <SelectionBox
                  desc="Vegetarian"
                  onClick={() => updatePreferences("vegetarian")}
                  checked={editedMeal.vegetarian}
                />
                <SelectionBox
                  desc="Vegan"
                  onClick={() => updatePreferences("vegan")}
                  checked={editedMeal.vegan}
                />
                <SelectionBox
                desc="Lupin"
                checked={editedMeal.lupin}
                onClick={() => updatePreferences("lupin")}
                />
                <SelectionBox
                  desc="Soya"
                  checked={editedMeal.soya}
                  onClick={() => updatePreferences("soya")}
                />
                <SelectionBox
                  desc="Egg"
                  checked={editedMeal.egg}
                  onClick={() => updatePreferences("egg")}
                />
                <SelectionBox
                  desc="Milk"
                  checked={editedMeal.milk}
                  onClick={() => updatePreferences("milk")}
                />
                <SelectionBox
                  desc="Fish"
                  checked={editedMeal.fish}
                  onClick={() => updatePreferences("fish")}
                />
                <SelectionBox
                  desc="Crustaceans"
                  checked={editedMeal.crustaceans}
                  onClick={() => updatePreferences("crustaceans")}
                />
                <SelectionBox
                  desc="Molluscs"
                  checked={editedMeal.molluscs}
                  onClick={() => updatePreferences("molluscs")}
                />
                <SelectionBox
                  desc="Mustard"
                  checked={editedMeal.mustard}
                  onClick={() => updatePreferences("mustard")}
                />
                <SelectionBox
                  desc="Celery"
                  checked={editedMeal.celery}
                  onClick={() => updatePreferences("celery")}
                />
                <SelectionBox
                  desc="Peanuts"
                  checked={editedMeal.peanuts}
                  onClick={() => updatePreferences("peanuts")}
                />
                <SelectionBox
                  desc="Sesame Seeds"
                  checked={editedMeal.sesame_seeds}
                  onClick={() => updatePreferences("sesame_seeds")}
                />
                <SelectionBox
                  desc="Sulphur Dioxide"
                  checked={editedMeal.sulphur_dioxide}
                  onClick={() => updatePreferences("sulphur_dioxide")}
                />
              </div>
            <button type="submit" className="bg-green-400 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4">
              Save Changes
            </button>
          </form>
          </div>
        </PopUp>
      </div>
    </div>
  );
}
