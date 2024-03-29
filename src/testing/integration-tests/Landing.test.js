import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "../../pages/Landing";
import SignUp from "../../pages/SignUp";

describe("Landing Component", () => {
  test("renders correctly and can navigate to the sign-up page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<SignUp />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Discover Mindful Eating/i)).toBeInTheDocument();
    expect(
      screen.getByText(/SAY GOODBYE TO THE STRESS OF FINDING/i)
    ).toBeInTheDocument();

    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Enter your name")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter your email")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter your password")
      ).toBeInTheDocument();
      expect(screen.getByText("Submit")).toBeInTheDocument();
    });
  });
});
