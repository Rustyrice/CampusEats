import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Enquiry from "../../../components/Enquiry";
import enquiriesService from "../../../services/enquiriesService";

// Mock the enquiriesService to ensure it returns a promise that resolves to an array
jest.mock("../../../services/enquiriesService", () => ({
  fetchEnquiries: jest.fn(() => Promise.resolve([])), // Simulate an empty response
  addEnquiry: jest.fn(),
  updateEnquiry: jest.fn(),
}));

describe("Enquiry Component", () => {
  it("renders without crashing", async () => {
    render(<Enquiry />);

    // Wait for any state updates or effects to complete
    await waitFor(() => {
      expect(enquiriesService.fetchEnquiries).toHaveBeenCalled();
    });
  });
});
