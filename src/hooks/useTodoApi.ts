import { useState, useCallback, useRef } from 'react';
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
  const hasFetched = useRef<boolean>(false);

  // Create stable function references
  const fetchTodos = useCallback(async () => {
    if (hasFetched.current) {
      console.log("fetchTodos already called, skipping");
      return;
    }
    
    try {
      hasFetched.current = true;
      const response = await axios.get<ApiTodoResponse[]>(`${API_BASE_URL}`);
      const normalizedTodos = response.data.map(normalizeTodo);
      setTodos(normalizedTodos);
    } catch (error: any) {
      console.error("Fetch Error:", error);
      setError('Error fetching todos: ' + (error?.message || 'Unknown error'));
      hasFetched.current = false; // Reset on error so it can be retried
    } finally {
      
    }
  }, []); // No dependencies - stable reference

  const createTodo = useCallback(async (todoData: CreateTodoInput): Promise<boolean> => {
    if (!todoData.title.trim()) return false;

    try {
      // setLoading(true);
      
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
        // Refetch todos after successful creation
        const todosResponse = await axios.get<ApiTodoResponse[]>(`${API_BASE_URL}`);
        const normalizedTodos = todosResponse.data.map(normalizeTodo);
        setTodos(normalizedTodos);
        return true;
      } else {
        setError('Failed to create todo');
        return false;
      }
    } catch (err: any) {
      setError('Error creating todo: ' + (err?.message || 'Unknown error'));
      return false;
    } finally {
      // setLoading(false);
    }
  }, []); 

  const updateTodo = useCallback(async (id: string, updates: UpdateTodoInput): Promise<boolean> => {
    try {
      setLoading(true);
      setError('');
      
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
        // Refetch todos after successful update
        const todosResponse = await axios.get<ApiTodoResponse[]>(`${API_BASE_URL}`);
        const normalizedTodos = todosResponse.data.map(normalizeTodo);
        setTodos(normalizedTodos);
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
  }, []); // No dependencies

  const deleteTodo = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refetch todos after successful deletion
        const todosResponse = await axios.get<ApiTodoResponse[]>(`${API_BASE_URL}`);
        const normalizedTodos = todosResponse.data.map(normalizeTodo);
        setTodos(normalizedTodos);
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
  }, []); // No dependencies

  const clearError = useCallback(() => {
    setError('');
  }, []);

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