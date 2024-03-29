import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "../../../components/Filter";
import { screen } from "@testing-library/react";

describe("Filter Component", () => {
  it("toggles the switch when clicked", () => {
    render(<Filter />);

    const switchElement = screen.getByRole("switch");

    expect(switchElement).toHaveClass("bg-gray-200");

    fireEvent.click(switchElement);

    expect(switchElement).toHaveClass("bg-green-500");
  });

  it("changes state when clicked", () => {
    render(<Filter />);

    const switchElement = screen.getByRole("switch");

    expect(switchElement).toHaveAttribute("aria-checked", "false");

    fireEvent.click(switchElement);

    expect(switchElement).toHaveAttribute("aria-checked", "true");
  });
});
