// src/components/EditTodo.tsx
import React, { useState, useCallback } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { styles } from '../styles/appStyles';
import { Todo } from '../types/Todo';

interface EditTodoProps {
  todo: Todo;
}

const EditTodo: React.FC<EditTodoProps> = React.memo(({ todo }) => {
  const { updateTodo, handleCancelEdit } = useTodoContext();
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDescription, setEditDescription] = useState<string>(todo.description || '');

  const handleSave = useCallback(() => {
    if (editTitle.trim()) {
      const todoId = todo.id || todo._id;
      if (todoId) {
        updateTodo(todoId, { 
          title: editTitle, 
          description: editDescription 
        });
      }
    }
  }, [editTitle, editDescription, updateTodo, todo.id, todo._id]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  }, [handleSave]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditDescription(e.target.value);
  }, []);

  return (
    <div style={styles.editForm}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={editTitle}
          onChange={handleTitleChange}
          onKeyPress={handleKeyPress}
          style={styles.input}
          placeholder="Todo title"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={editDescription}
          onChange={handleDescriptionChange}
          placeholder="Description"
          style={styles.textarea}
          rows={2}
        />
      </div>
      <button onClick={handleSave} style={styles.smallButton}>
        Save
      </button>
      <button onClick={handleCancelEdit} style={styles.smallButton}>
        Cancel
      </button>
    </div>
  );
});

EditTodo.displayName = 'EditTodo';

export default EditTodo;