import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import SelectionBox from '../components/SelectionBox';
import { useState } from 'react';

const updatePreference = (preference) => {
  preference = !preference;
}


test('Should render selection box component' , () => {
  let isHalal = false;

  //SETUP
  render(<SelectionBox
    desc="Halal"
    onClick={() => updatePreference(isHalal)}
    checked={true}
  />);

  //CALL
  const todoElement = screen.getByTestId('tickedCheckbox');

  //ASSERTION
  expect(todoElement).toBeInTheDocument();
})