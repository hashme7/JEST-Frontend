import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoHeader from "./components/TodoHeader";
import ErrorBanner from "./components/ErrorBanner";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import { useTodoApi } from "./hooks/useTodoApi";
import { styles } from "./styles/appStyles";
import { Todo } from "./types/Todo";

const TodoApp: React.FC = () => {
  const {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    clearError,
  } = useTodoApi();

  const [editingTodo, setEditingTodo] = useState<string | null>(null);

  const activeTodos = useMemo<Todo[]>(
    () => todos.filter((todo: Todo) => !todo.isDeleted && !todo.deleted),
    [todos]
  );

  const handleEditTodo = useCallback((id: string) => {
    setEditingTodo(id);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTodo(null);
  }, []);

  const handleUpdateTodo = useCallback(
    async (id: string, updates: Partial<Todo>) => {
      await updateTodo(id, updates);
      setEditingTodo(null);
    },
    [updateTodo]
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <TodoProvider
      value={{
        todos: activeTodos,
        loading,
        error,
        editingTodo,
        createTodo,
        updateTodo: handleUpdateTodo,
        deleteTodo,
        clearError,
        handleEditTodo,
        handleCancelEdit,
      }}
    >
      <div style={styles.container}>
        <TodoHeader todosCount={activeTodos.length} />

        <ErrorBanner />

        <CreateTodo />

        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default TodoApp;