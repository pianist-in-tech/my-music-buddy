import '@testing-library/jest-dom';
// Import the script to be tested
import './script.js'; 
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

// **********famous-people tests************

// Mock DOM elements and functions
jest.mock('../backend/famous_people.json', () => ({
  famous_people: [
    {
      id: 1,
      music_piece_id: 1
    },
    {
      id: 2,
      music_piece_id: 2
    }
    // Add more mock data as needed
  ]
}));

// Import the script to be tested
import { fetchMusicPieceInfo } from './famous-people';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        music_pieces: [
          {
            id: 1,
            title: 'Sample Title 1',
            composer: 'Sample Composer 1',
            spotify_id: 'spotify:track:sample_track_id_1'
          },
          {
            id: 2,
            title: 'Sample Title 2',
            composer: 'Sample Composer 2',
            spotify_id: 'spotify:track:sample_track_id_2'
          }
        ]
      })
  })
);

// Describe the test suite for the fetchMusicPieceInfo function
describe('fetchMusicPieceInfo function', () => {
  // Test case for successful retrieval of music piece info
  test('should return correct music piece info', async () => {
    const musicPieceInfo = await fetchMusicPieceInfo(1); // Mocking personId as 1
    expect(musicPieceInfo).toEqual({
      id: 1,
      title: 'Sample Title 1',
      composer: 'Sample Composer 1',
      spotify_id: 'spotify:track:sample_track_id_1'
    });
  });
});

//**********piece_page.test******************

import '@testing-library/jest-dom';

// Mock DOM elements and functions
document.body.innerHTML = `
  <div id="pieceInfo"></div>
  <iframe id="spotify-embed"></iframe>
  <button id="backButton">Back</button>
`;

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
