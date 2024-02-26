// import { render, screen, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom'
// import SelectionBox from '../components/SelectionBox';
// import { useState } from 'react';

// const updatePreference = (preference) => {
//   preference = !preference;
// }


// test('Should render selection box component' , () => {
//   let isHalal = false;

//   //SETUP
//   render(<SelectionBox
//     desc="Halal"
//     onClick={() => updatePreference(isHalal)}
//     checked={true}
//   />);

//   //CALL
//   const todoElement = screen.getByTestId('tickedCheckbox');

//   //ASSERTION
//   expect(todoElement).toBeInTheDocument();
// })

// Assuming SelectionBox has an `onChange` prop to handle changes
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectionBox from '../components/SelectionBox';
import { useState } from 'react';

// Simulate a parent component to hold the state
function SelectionBoxTest() {
  const [isHalal, setIsHalal] = useState(false);
  
  return (
    <SelectionBox
      desc="Halal"
      onClick={() => setIsHalal(prev => !prev)}
      checked={isHalal}
    />
  );
}

test('Selection box component reflects halal preference', () => {
  //SETUP
  render(<SelectionBoxTest />);

  // CALL
  const checkbox = screen.getByRole('checkbox'); 
  fireEvent.click(checkbox);

  //ASSERTION
  expect(checkbox).toBeChecked(); // Check if the checkbox reflects the expected state
});