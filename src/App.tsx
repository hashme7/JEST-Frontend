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

  // Memoize activeTodos with proper dependency
  const activeTodos = useMemo<Todo[]>(() => {
    return todos.filter((todo: Todo) => !todo.isDeleted && !todo.deleted);
  }, [todos]);

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

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
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
  }), [
    activeTodos,
    loading,
    error,
    editingTodo,
    createTodo,
    handleUpdateTodo,
    deleteTodo,
    clearError,
    handleEditTodo,
    handleCancelEdit,
  ]);
  

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  console.log("App render - loading:", loading, "todos length:", todos.length, "activeTodos length:", activeTodos.length);
  
  return (
    <TodoProvider value={contextValue}>
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