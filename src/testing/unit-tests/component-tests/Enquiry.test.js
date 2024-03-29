import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Enquiry from "../../../components/Enquiry";
import enquiriesService from "../../../services/enquiriesService";

jest.mock("../../../services/enquiriesService", () => ({
  fetchEnquiries: jest.fn(() => Promise.resolve([])),
  addEnquiry: jest.fn(),
  updateEnquiry: jest.fn(),
}));

describe("Enquiry Component", () => {
  it("renders without crashing", async () => {
    render(<Enquiry />);

    await waitFor(() => {
      expect(enquiriesService.fetchEnquiries).toHaveBeenCalled();
    });
  });
});
