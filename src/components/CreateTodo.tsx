import React, { useState, useCallback } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { styles } from '../styles/appStyles';
import { CreateTodoInput } from '../types/Todo';

const CreateTodo: React.FC = React.memo(() => {
  const { createTodo, loading } = useTodoContext();
  const [newTodo, setNewTodo] = useState<CreateTodoInput>({
    title: '',
    description: '',
    isCompleted: false,
    isDeleted: false,
  });

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodo((prev) => ({ ...prev, title: e.target.value }));
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewTodo((prev) => ({ ...prev, description: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const success = await createTodo(newTodo);
    if (success) {
      setNewTodo({
        title: '',
        description: '',
        isCompleted: false,
        isDeleted: false,
      });
    }
  }, [createTodo, newTodo]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const isCreateDisabled = loading || !newTodo.title.trim();

  return (
    <div style={styles.createSection}>
      <h2 style={{ marginTop: '0' }}>Add New Todo</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Todo title"
          value={newTodo.title}
          onChange={handleTitleChange}
          onKeyPress={handleKeyPress}
          style={styles.input}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="Description (optional)"
          value={newTodo.description || ''}
          onChange={handleDescriptionChange}
          style={styles.textarea}
          rows={3}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isCreateDisabled}
        style={isCreateDisabled ? styles.buttonDisabled : styles.button}
      >
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </div>
  );
});

CreateTodo.displayName = 'CreateTodo';

export default CreateTodo;