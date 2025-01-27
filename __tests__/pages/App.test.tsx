import { render } from "@testing-library/react";
import React from "react";
import App from "../../src/pages/App";

test('Render App', () => {
  render(<App />);
  expect(true).toBeTruthy();
})