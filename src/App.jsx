// src/App.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoHeader from './components/TodoHeader';
import ErrorBanner from './components/ErrorBanner';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import { useTodoApi } from './hooks/useTodoApi';
import { styles } from './styles/appStyles';

const TodoApp = () => {
  const {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    clearError
  } = useTodoApi();
console.log("Todos:", todos);
  const [editingTodo, setEditingTodo] = useState(null);

  // Memoize filtered todos to prevent unnecessary filtering
  const activeTodos = useMemo(() => 
    todos.filter(todo => !todo.isDeleted), 
    [todos]
  );

  const handleEditTodo = useCallback((id) => {
    setEditingTodo(id);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTodo(null);
  }, []);

  const handleUpdateTodo = useCallback(async (id, updates) => {
    await updateTodo(id, updates);
    setEditingTodo(null);
  }, [updateTodo]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoProvider value={{
      todos: activeTodos,
      loading,
      error,
      editingTodo,
      createTodo,
      updateTodo: handleUpdateTodo,
      deleteTodo,
      clearError,
      handleEditTodo,
      handleCancelEdit
    }}>
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