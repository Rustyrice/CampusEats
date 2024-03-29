import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "../../../pages/SignUp";

describe("Form component", () => {
  it("submits the form with valid data", () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Nick Z" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "Nickz@yahoo.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Test123!" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/successfully registered/i)).toBeInTheDocument();
  });

  it("displays error messages with invalid data", () => {
    render(<Form />);

    fireEvent.click(screen.getByText(/Submit/i));

    expect(
      screen.getByText(/Please enter valid information for all fields/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enter a valid email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Password must be at least 8 characters long/i)
    ).toBeInTheDocument();
  });
});
