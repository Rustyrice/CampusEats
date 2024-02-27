import React, { useState, useEffect } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const UserMealComponent = () => {
  const [userAllergens, setUserAllergens] = useState([]);
  const [userMeals, setUserMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    // Simulating fetching user allergens from a local object
    const fetchUserAllergens = () => {
      // Simulated user allergens
      const allergens = ['peanut', 'dairy'];
      setUserAllergens(allergens);
    };

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

    fetchUserAllergens();
    fetchUserMeals();
  }, []);

  useEffect(() => {
    // Filter meals based on user preferences and allergens
    let filtered = userMeals.filter(meal => {
      // Check if the meal doesn't contain any allergen from userAllergens
      return !userAllergens.some(allergen => meal[allergen]);
    });

    // Logging filtered meals
    console.log('Filtered meals:', filtered);

    // Set filtered meals to state
    setFilteredMeals(filtered);
  }, [userAllergens, userMeals]);

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


test('Selection box component reflects halal preference', () => {
    //SETUP
    render(<SelectionBoxTest />);
  
    // CALL
    const checkbox = screen.getByRole('checkbox'); 
    fireEvent.click(checkbox);
  
    //ASSERTION
    expect(checkbox).toBeChecked(); // Check if the checkbox reflects the expected state
  });

export default UserMealComponent;

