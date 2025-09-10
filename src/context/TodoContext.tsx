import React, { createContext, useContext } from "react";
import { Todo, CreateTodoInput, UpdateTodoInput } from "../types/Todo";

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  editingTodo: string | null;
  createTodo: (todo: CreateTodoInput) => Promise<boolean>;
  updateTodo: (id: string, updates: UpdateTodoInput) => Promise<boolean | void>;
  deleteTodo: (id: string) => Promise<boolean | void>;
  handleEditTodo: (id: string) => void;
  handleCancelEdit: () => void;
  clearError: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TodoContextType;
}) => {
  return (
    <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};