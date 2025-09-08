import '@testing-library/jest-dom';

global.fetch = jest.fn();

process.env.VITE_API_BASE_URL = 'http://localhost:3000';

beforeEach(() => {
  fetch.mockClear();
});