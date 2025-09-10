import { useState, useCallback } from 'react';
import axios from 'axios';
import { Todo, CreateTodoInput, UpdateTodoInput, ApiTodoResponse } from '../types/Todo';

const API_BASE_URL = 'https://2rr8ntqtuj.execute-api.us-east-1.amazonaws.com/Prod';

// Helper function to normalize API response to our Todo interface
const normalizeTodo = (apiTodo: ApiTodoResponse): Todo => ({
  id: apiTodo._id,
  _id: apiTodo._id,
  title: apiTodo.title,
  description: apiTodo.description,
  isCompleted: apiTodo.completed,
  completed: apiTodo.completed,
  isDeleted: apiTodo.deleted || false,
  deleted: apiTodo.deleted || false,
  createdAt: apiTodo.createdAt,
  updatedAt: apiTodo.updatedAt,
});

export const useTodoApi = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiTodoResponse[]>(`${API_BASE_URL}`);
      const normalizedTodos = response.data.map(normalizeTodo);
      setTodos(normalizedTodos);
      setError('');
    } catch (error: any) {
      console.error("Fetch Error:", error);
      setError('Error fetching todos: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = useCallback(async (todoData: CreateTodoInput): Promise<boolean> => {
    if (!todoData.title.trim()) return false;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: todoData.title,
          description: todoData.description || '',
          completed: todoData.isCompleted || false,
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
    } catch (err: any) {
      setError('Error creating todo: ' + (err?.message || 'Unknown error'));
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTodos]);

  const updateTodo = useCallback(async (id: string, updates: UpdateTodoInput): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Convert our internal format to API format
      const apiUpdates = {
        title: updates.title,
        description: updates.description,
        completed: updates.isCompleted !== undefined ? updates.isCompleted : updates.completed,
        deleted: updates.isDeleted !== undefined ? updates.isDeleted : updates.deleted,
      };

      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiUpdates)
      });

      if (response.ok) {
        await fetchTodos();
        setError('');
        return true;
      } else {
        setError('Failed to update todo');
        return false;
      }
    } catch (err: any) {
      setError('Error updating todo: ' + (err?.message || 'Unknown error'));
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTodos]);

  const deleteTodo = useCallback(async (id: string): Promise<boolean> => {
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
    } catch (err: any) {
      setError('Error deleting todo: ' + (err?.message || 'Unknown error'));
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