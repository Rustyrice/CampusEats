import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopUp from "../../../components/PopUp";
import { screen } from "@testing-library/react";

describe("PopUp Component", () => {
  it("renders the PopUp component with trigger true", () => {
    const onCloseMock = jest.fn();

    render(
      <PopUp trigger={true} onClose={onCloseMock}>
        <div>PopUp Content</div>
      </PopUp>
    );

    expect(screen.getByText("PopUp Content")).toBeInTheDocument();

    fireEvent.click(screen.getByText("×"));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("does not render the PopUp component with trigger false", () => {
    const { container } = render(
      <PopUp trigger={false}>
        <div>PopUp Content</div>
      </PopUp>
    );

    expect(container.firstChild).toBeNull();
  });
});
