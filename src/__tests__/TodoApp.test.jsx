import { render, screen } from '@testing-library/react';
import TodoApp from '../App';
import axios from 'axios';
jest.mock("axios");

global.fetch = jest.fn();

describe("TodoApp", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  test("renders todo app with title",async () => {
   axios.get.mockResolvedValueOnce({ data: [] });
    render(<TodoApp />);

    expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
    expect(screen.getByText(/Add New Todo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/todo title/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Todos /i)).toBeInTheDocument();
  })
  test("show no todos message when no todos exist", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<TodoApp />);

    expect(await screen.findByText('No todos yet. Add one above!')).toBeInTheDocument();
  });
})