import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import EditTodo from './EditTodo';
import { styles } from '../styles/appStyles';

const TodoList = React.memo(() => {
  const { todos, loading, editingTodo } = useTodoContext();

  if (loading && todos.length === 0) {
    return <p>Loading todos...</p>;
  }

  if (todos.length === 0) {
    return (
      <p style={styles.emptyState}>
        No todos yet. Add one above!
      </p>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        editingTodo === todo._id ? (
          <EditTodo
            key={`edit-${todo._id}`}
            todo={todo}
          />
        ) : (
          <TodoItem
            key={todo._id}
            todo={todo}
          />
        )
      ))}
    </div>
  );
});

TodoList.displayName = 'TodoList';

export default TodoList;