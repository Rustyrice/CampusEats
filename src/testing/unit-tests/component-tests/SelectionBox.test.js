// UNIT TEST TO VALIDATE THAT COMPONENT RENDERS CORRECTLY ACCORDING TO PROPS GIVEN

import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectionBox from "../../../components/SelectionBox";

test("Should render selection box component with text passed into description prop", () => {
  //SETUP - Render the component into DOM
  render(
    <SelectionBox
      desc="Halal"
      onClick={() => console.log("onClick Triggered")}
      checked={true}
    />
  );

  //CALL - Get the component with text "Halal" from the DOM, if it exists
  const SelectionBoxComponent = screen.getByText("Halal");

  //ASSERTION - Check if the appropriate component exists
  expect(SelectionBoxComponent).toBeInTheDocument();
});

// // Assuming SelectionBox has an `onChange` prop to handle changes
// import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import SelectionBox from '../../../components/SelectionBox';
// import { useState } from 'react';

// // Simulate a parent component to hold the state
// function SelectionBoxTest() {
//   const [isHalal, setIsHalal] = useState(false);

//   return (
//     <SelectionBox
//       desc="Halal"
//       onClick={() => setIsHalal(prev => !prev)}
//       checked={isHalal}
//     />
//   );
// }

// test('Selection box component reflects halal preference', () => {
//   //SETUP
//   render(<SelectionBoxTest />);

//   // CALL
//   const checkbox = screen.getByRole('checkbox');
//   fireEvent.click(checkbox);

//   //ASSERTION
//   expect(checkbox).toBeChecked(); // Check if the checkbox reflects the expected state
// });
