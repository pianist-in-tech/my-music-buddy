import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import { screen } from '@testing-library/dom';

// Describe the test suite for the button functionality
describe('Button functionality', () => {
  // Test case for the click event
  test('Click event should be triggered when the button is clicked', () => {
    // Render the button
    const button = createButton();
    
    // Click the button
    clickButton(button);

    // Assert that the expected log message is printed
    expect(console.log).toHaveBeenCalledWith('clicked!');
  });

  // Test case for the redirection
  test('Clicking the button should redirect to "famous_people.html"', () => {
    // Render the button
    const button = createButton();

    // Click the button
    clickButton(button);

    // Assert that the window location is changed to "famous_people.html"
    expect(window.location.href).toBe('famous_people.html');
  });
});
