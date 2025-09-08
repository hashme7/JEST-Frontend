import React from 'react';
import { styles } from '../styles/appStyles';

const TodoHeader = React.memo(({ todosCount }) => {
  return (
    <>
      <h1 style={styles.title}>Todo App</h1>
      <h2>Your Todos ({todosCount})</h2>
    </>
  );
});

TodoHeader.displayName = 'TodoHeader';

export default TodoHeader;