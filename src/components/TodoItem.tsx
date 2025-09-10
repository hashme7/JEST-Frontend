// src/components/TodoItem.tsx
import React, { useCallback } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { styles } from '../styles/appStyles';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo }) => {
  const { updateTodo, deleteTodo, handleEditTodo } = useTodoContext();

  const handleEdit = useCallback(() => {
    const todoId = todo.id || todo._id;
    if (todoId) {
      handleEditTodo(todoId);
    }
  }, [handleEditTodo, todo.id, todo._id]);
  
  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      const todoId = todo.id || todo._id;
      if (todoId) {
        deleteTodo(todoId);
      }
    }
  }, [deleteTodo, todo.id, todo._id]);

  const handleToggleComplete = useCallback(() => {
    const todoId = todo.id || todo._id;
    const isCompleted = todo.isCompleted !== undefined ? todo.isCompleted : todo.completed;
    
    if (todoId) {
      updateTodo(todoId, { 
        isCompleted: !isCompleted,
        completed: !isCompleted 
      });
    }
  }, [updateTodo, todo.id, todo._id, todo.isCompleted, todo.completed]);

  const isCompleted = todo.isCompleted !== undefined ? todo.isCompleted : (todo.completed || false);
  const createdDate = todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'Unknown';
  const updatedDate = todo.updatedAt ? new Date(todo.updatedAt).toLocaleDateString() : null;

  return (
    <div style={isCompleted ? styles.todoItemCompleted : styles.todoItem}>
      <div style={styles.todoHeader}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggleComplete}
          style={styles.checkbox}
        />
        <h3 style={isCompleted ? styles.todoTitleCompleted : styles.todoTitle}>
          {todo.title}
        </h3>
      </div>
      
      {todo.description && (
        <p style={isCompleted ? styles.descriptionCompleted : styles.description}>
          {todo.description}
        </p>
      )}
      
      <div style={styles.metadata}>
        Created: {createdDate}
        {updatedDate && updatedDate !== createdDate && (
          <span> | Updated: {updatedDate}</span>
        )}
      </div>
      
      <div>
        <button onClick={handleEdit} style={styles.smallButton}>
          Edit
        </button>
        <button onClick={handleDelete} style={styles.smallButton}>
          Delete
        </button>
      </div>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;