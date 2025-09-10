import '@testing-library/jest-dom';

global.fetch = jest.fn() as jest.Mock;

process.env.VITE_API_BASE_URL = 'http://localhost:3000';

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});
