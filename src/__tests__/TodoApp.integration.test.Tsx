import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TodoApp from "../App";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("TodoApp Integration Tests", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test("adds a todo and shows it in the list", async () => {
    const user = userEvent.setup();

    // First API call: no todos
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<TodoApp />);

    // Mock fetch for adding a todo
    mockFetch.mockResolvedValueOnce({ ok: true } as Response);

    // Second API call: after adding a todo
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          _id: "1",
          title: "Integration Test Todo",
          description: "Testing the complete flow",
          completed: false,
          createdAt: "2023-01-01T00:00:00.000Z",
        },
      ],
    });

    await user.type(
      screen.getByPlaceholderText(/todo title/i),
      "Integration Test Todo"
    );
    await user.type(
      screen.getByPlaceholderText(/description/i),
      "Testing the complete flow"
    );
    await user.click(screen.getByRole("button", { name: /add todo/i }));

    // Assert todo is visible
    const todoItem = await screen.findByText("Integration Test Todo");
    expect(todoItem).toBeInTheDocument();
  });
});
