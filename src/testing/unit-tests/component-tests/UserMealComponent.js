import React, { useState, useEffect } from "react";

const UserMealComponent = ({ allergens, preferencesToFilter }) => {
  const [userMeals, setUserMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    const fetchUserMeals = () => {
      const meals = [
        {
          name: "Spaghetti",
          halal: false,
          vegetarian: false,
          vegan: false,
          peanut: false,
          dairy: false,
        },
        {
          name: "Salad",
          halal: true,
          vegetarian: true,
          vegan: true,
          peanut: false,
          dairy: false,
        },
        {
          name: "Pizza",
          halal: false,
          vegetarian: false,
          vegan: false,
          peanut: false,
          dairy: true,
        },
      ];
      setUserMeals(meals);
    };

    fetchUserMeals();
  }, []);

  useEffect(() => {
    let filtered = userMeals.filter((meal) => {
      return !allergens.some((allergen) => meal[allergen]);
    });

    filtered = filtered.filter((meal) =>
      preferencesToFilter.every((preference) => meal[preference])
    );

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
