import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ingredientService from "../../services/ingredientService";
import RecipeCard from "../../components/RecipeCard";

// Mock the ingredientService
jest.mock("../../services/ingredientService", () => ({
  updateMeal: jest.fn(),
  deleteMeal: jest.fn(),
}));

const mockMeal = {
  id: 1,
  name: "Spaghetti Carbonara",
  description:
    "A classic Italian dish with eggs, cheese, bacon, and black pepper.",
  halal: false,
  vegetarian: false,
  vegan: false,
};

describe("RecipeCard Component", () => {
  it("allows a user to edit and delete a meal", async () => {
    const onDeleteMock = jest.fn();

    // Render RecipeCard with a mock meal and onDelete function
    const { getByText, getByPlaceholderText, queryByText } = render(
      <RecipeCard meal={mockMeal} onDelete={onDeleteMock} />
    );

    // Simulate clicking the edit button
    fireEvent.click(screen.getByText("Edit"));

    // Simulate changing the name and description of the meal
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Updated Spaghetti Carbonara" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "An updated classic Italian dish." },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Save Changes"));

    // Expect the updateMeal function to have been called
    await waitFor(() =>
      expect(ingredientService.updateMeal).toHaveBeenCalledWith(
        mockMeal.id,
        expect.anything()
      )
    );

    // Simulate clicking the delete button
    fireEvent.click(screen.getByText("Delete"));

    // Confirm deletion
    fireEvent.click(screen.getByText("Yes, Delete"));

    // Expect the deleteMeal function to have been called
    await waitFor(() =>
      expect(ingredientService.deleteMeal).toHaveBeenCalledWith(mockMeal.id)
    );

    // Expect the onDelete function to have been called after deletion
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
