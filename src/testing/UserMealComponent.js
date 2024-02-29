import React, { useState, useEffect } from 'react';

const UserMealComponent = ({ allergens, preferencesToFilter }) => {
  const [userMeals, setUserMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    // Simulating fetching user meals from a local object
    const fetchUserMeals = () => {
      // Simulated user meals
      const meals = [
        { name: 'Spaghetti', halal: false, vegetarian: false, vegan: false, peanut: false, dairy: false },
        { name: 'Salad', halal: true, vegetarian: true, vegan: true, peanut: false, dairy: false },
        { name: 'Pizza', halal: false, vegetarian: false, vegan: false, peanut: false, dairy: true },
      ];
      setUserMeals(meals);
    };

    fetchUserMeals();
  }, []);

  useEffect(() => {
    // Filter meals based on user preferences and allergens
    let filtered = userMeals.filter(meal => {
      // Check if the meal doesn't contain any allergen from allergens
      return !allergens.some(allergen => meal[allergen]);
    });

    // Filter meals based on preferencesToFilter
    filtered = filtered.filter(meal =>
      preferencesToFilter.every(preference => meal[preference])
    );

    // Set filtered meals to state
    setFilteredMeals(filtered);
  }, [allergens, userMeals, preferencesToFilter]);

  return (
    <div>
      <h2>User Meals</h2>
      <ul>
        {filteredMeals.map((meal, index) => (
          <li key={index}>{meal.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserMealComponent;
