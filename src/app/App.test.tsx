import React from 'react';
import {fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders broterm input ', () => {
  render(<App />);
  const app = screen.getByText(/broterm ~ %/i);
  expect(app).toBeInTheDocument();

  const input = screen.getByTestId("broterm-input");
  expect(input).toBeInTheDocument();

  // new line
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
  
});
