// context/TodoContext.tsx
import React, { createContext, useContext } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  editingTodo: string | null;
  setEditingTodo: (id: string | null) => void;
  createTodo: (todo: Omit<Todo, "_id" | "createdAt" | "updatedAt">) => Promise<boolean>;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
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

