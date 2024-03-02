import Cards from "../../../components/Cards";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Cards Component", () => {
  it("Card component renders without crashing and shows loading state", () => {
    render(<Cards />);

    // Check for loading message
    const loadingMessage = screen.queryByText(/Loading recipes.../i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
