import React, { useEffect, useState } from "react";
import ingredientService from "../services/ingredientService";

// Basic code that uses ingredientService to fetch all meals along with their data
// Feel free to delete; just used for testing backend

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState("");

  useEffect(() => {
    const getMeals = async () => {
      try {
        const meals = await ingredientService.fetchMeals();
        setMeals(meals);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    };
    getMeals();
  }, []);

  const handleMealChange = (event) => {
    setNewMeal(event.target.value);
  };

  const addMeal = (event) => {
    event.preventDefault();
    const mealObj = JSON.parse(newMeal);
    ingredientService.addMeal(mealObj);
    setNewMeal("");
  };

  return (
    <div>
      <form onSubmit={addMeal}>
        <input
          placeholder="meal details"
          value={newMeal}
          onChange={handleMealChange}
        />
        <input type="submit" />
      </form>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>{meal.product}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
