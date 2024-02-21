import React, { useState } from "react";
import PopUp from "./PopUp";
import ingredientService from "../services/ingredientService";

export default function RecipeCard({ meal, onDelete }) {
  const [newMeal, setNewMeal] = useState({ name: meal.name, description: meal.description });
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
      await ingredientService.updateMeal(meal.id, newMeal);
      setEditButton(false);
    } catch (error) {
      console.error("Failed to edit meal:", error);
    }
  };

  const handleNameChange = (e) => {
    setNewMeal({ ...newMeal, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewMeal({ ...newMeal, description: e.target.value });
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
          <form onSubmit={handleEditSubmit} className="p-4">
            <input
              type="text"
              placeholder="Name"
              value={newMeal.name}
              onChange={handleNameChange}
              className="w-full h-10 px-4 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none mb-4"
            />
            <textarea
              placeholder="Description"
              value={newMeal.description}
              onChange={handleDescriptionChange}
              className="w-full h-20 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
            />
            <button type="submit" className="bg-green-400 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4">
              Save Changes
            </button>
          </form>
        </PopUp>
      </div>
    </div>
  );
}
