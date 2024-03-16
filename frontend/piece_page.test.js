import '@testing-library/jest-dom';

// Mock DOM elements and functions
document.body.innerHTML = `
  <div id="pieceInfo"></div>
  <iframe id="spotify-embed"></iframe>
  <button id="backButton">Back</button>
`;

// Import the script to be tested
import './piece_page'; // Make sure to correct the path if necessary

// Describe the test suite for the piece_page.js script
describe('piece_page script', () => {
  // Test case for DOMContentLoaded event listener
  test('should correctly handle DOMContentLoaded event', () => {
    // Simulate DOMContentLoaded event
    document.dispatchEvent(new Event('DOMContentLoaded'));

    // Verify that the parameters from the URL are correctly read
    expect(global.URLSearchParams.prototype.get).toHaveBeenCalledTimes(3); // Assuming there are 3 URL parameters
  });

  // Test case for backButton click event listener
  test('should correctly handle backButton click event', () => {
    // Simulate click on the backButton
    document.getElementById('backButton').click();

    // Verify that window.location.href is updated correctly
    expect(window.location.href).toBe('famous_people.html');
  });
});
