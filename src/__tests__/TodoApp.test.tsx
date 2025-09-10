import { render, screen, waitFor } from '@testing-library/react';
import TodoApp from '../App';
import axios from 'axios';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("TodoApp", () => {

  test("renders todo app with title", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<TodoApp />);
    waitFor(() => {
      expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
      expect(screen.getByText(/Add New Todo/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/todo title/i)).toBeInTheDocument();
      expect(screen.getByText(/Your Todos /i)).toBeInTheDocument();
    })
    expect(await screen.findByText('No todos yet. Add one above!')).toBeInTheDocument();
  });
});
