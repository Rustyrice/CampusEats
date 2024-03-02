//FUNCTION TEST TO ENSURE THAT FILTERING PROCESS WORKS AS INTENDED REGARDLESS OF INPUT SELECTED

import React from "react";
import { render, screen } from "@testing-library/react";
import UserMealComponent from "../../UserMealComponent";
import "@testing-library/jest-dom";

test("UserMealComponent filters meals based on preferences", () => {
  // SETUP
  // Define allergens and preferences to filter
  const allergens = ["peanut", "dairy"];
  const preferencesToFilter = ["halal"];

  render(
    <UserMealComponent
      allergens={allergens}
      preferencesToFilter={preferencesToFilter}
    />
  );

  // CALL: Get the components with corresponding texts below from the DOM, if they exist
  const spaghettiElement = screen.queryByText("Spaghetti");
  const saladElement = screen.queryByText("Salad");
  const pizzaElement = screen.queryByText("Pizza");

  // ASSERTION
  expect(spaghettiElement).not.toBeInTheDocument();
  expect(saladElement).toBeInTheDocument();
  expect(pizzaElement).not.toBeInTheDocument();
});
