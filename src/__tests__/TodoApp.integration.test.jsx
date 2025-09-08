import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TodoApp from "../App";
import axios from "axios";
jest.mock("axios");


global.fetch = jest.fn();

describe("TodoApp Integration Tests", () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    test("adds a todo and shows it in the list", async () => {
        const user = userEvent.setup();

        axios.get.mockResolvedValueOnce({ data: [] });

        render(<TodoApp />);

        // expect(await screen.findByText(/no todos yet/i)).toBeInTheDocument();
        fetch.mockResolvedValueOnce({ ok: true });
        axios.get.mockResolvedValueOnce({
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
        
        await user.type(screen.getByPlaceholderText(/todo title/i), "Integration Test Todo");
        await user.type(screen.getByPlaceholderText(/description/i), "Testing the complete flow");
        await user.click(screen.getByRole("button", { name: /add todo/i }));
        
        await expect(screen.getByText("Integration Test Todo")).toBeInTheDocument();
        const todoItem = await screen.findByText("Integration Test Todo");
        expect(todoItem).toBeInTheDocument();
    });
})