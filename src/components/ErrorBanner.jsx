import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import { styles } from '../styles/appStyles';

const ErrorBanner = React.memo(() => {
  const { error, clearError } = useTodoContext();

  if (!error) return null;

  return (
    <div style={styles.error}>
      {error}
      <button onClick={clearError} style={styles.errorButton}>
        ×
      </button>
    </div>
  );
});

ErrorBanner.displayName = 'ErrorBanner';

export default ErrorBanner;