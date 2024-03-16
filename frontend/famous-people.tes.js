import '@testing-library/jest-dom';

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
