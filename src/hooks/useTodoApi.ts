import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://2rr8ntqtuj.execute-api.us-east-1.amazonaws.com/Prod/';

export const useTodoApi = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setTodos(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      setError('Error fetching todos: ' + error.message);
    }
  }, []);

  const createTodo = useCallback(async (todoData) => {
    if (!todoData.title.trim()) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todoData,
          userId: 'anonymous'
        })
      });

      
      if (response.ok) {
        await fetchTodos();
        setError('');
        return true;
      } else {
        setError('Failed to create todo');
        return false;
      }
    } catch (err) {
      setError('Error creating todo: ' + err.message);
      return false;
    } 
  }, [fetchTodos]);

  const updateTodo = useCallback(async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        await fetchTodos();
        setError('');
        return true;
      } else {
        setError('Failed to update todo');
        return false;
      }
    } catch (err) {
      setError('Error updating todo: ' + err.message);
      return false;
    }
  }, [fetchTodos]);

  const deleteTodo = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchTodos();
        setError('');
        return true;
      } else {
        setError('Failed to delete todo');
        return false;
      }
    } catch (err) {
      setError('Error deleting todo: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTodos]);

  const clearError = useCallback(() => setError(''), []);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    clearError
  };
};