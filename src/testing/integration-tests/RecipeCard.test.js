import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ingredientService from "../../services/ingredientService";
import RecipeCard from "../../components/RecipeCard";

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

    render(<RecipeCard meal={mockMeal} onDelete={onDeleteMock} />);

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Updated Spaghetti Carbonara" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "An updated classic Italian dish." },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() =>
      expect(ingredientService.updateMeal).toHaveBeenCalledWith(
        mockMeal.id,
        expect.anything()
      )
    );

    fireEvent.click(screen.getByText("Delete"));

    fireEvent.click(screen.getByText("Yes, Delete"));

    await waitFor(() =>
      expect(ingredientService.deleteMeal).toHaveBeenCalledWith(mockMeal.id)
    );

    expect(onDeleteMock).toHaveBeenCalled();
  });
});
