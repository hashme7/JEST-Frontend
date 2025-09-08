// src/components/TodoItem.jsx
import React, { useCallback } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { styles } from '../styles/appStyles';

const TodoItem = React.memo(({ todo }) => {
  const { updateTodo, deleteTodo, handleEditTodo } = useTodoContext();

  const handleEdit = useCallback(() => {
    handleEditTodo(todo._id);
  }, [handleEditTodo, todo._id]);
  
  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(todo._id);
    }
  }, [deleteTodo, todo._id]);

  const handleToggleComplete = useCallback(() => {
    updateTodo(todo._id, { completed: !todo.completed });
  }, [updateTodo, todo._id, todo.completed]);

  return (
    <div style={todo.completed ? styles.todoItemCompleted : styles.todoItem}>
      <div style={styles.todoHeader}>
        <input
          type="checkbox"
          checked={todo.completed || false}
          onChange={handleToggleComplete}
          style={styles.checkbox}
        />
        <h3 style={todo.completed ? styles.todoTitleCompleted : styles.todoTitle}>
          {todo.title}
        </h3>
      </div>
      
      {todo.description && (
        <p style={todo.completed ? styles.descriptionCompleted : styles.description}>
          {todo.description}
        </p>
      )}
      
      <div style={styles.metadata}>
        Created: {new Date(todo.createdAt).toLocaleDateString()}
        {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
          <span> | Updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
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