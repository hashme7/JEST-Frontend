import { render, screen } from '@testing-library/react';
import TodoApp from '../App';
import axios from 'axios';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

global.fetch = jest.fn() as jest.Mock;

describe("TodoApp", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("renders todo app with title", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<TodoApp />);

    expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
    expect(screen.getByText(/Add New Todo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/todo title/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Todos /i)).toBeInTheDocument();
  });

  test("show no todos message when no todos exist", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<TodoApp />);

    expect(await screen.findByText('No todos yet. Add one above!')).toBeInTheDocument();
  });
});
