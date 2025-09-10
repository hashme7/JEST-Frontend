import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import EditTodo from './EditTodo';
import { styles } from '../styles/appStyles';

const TodoList: React.FC = React.memo(() => {
  const { todos, editingTodo,loading } = useTodoContext();


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
      {todos.map((todo) => {
        const todoId = todo.id || todo._id;
        
        if (!todoId) {
          console.warn('Todo without ID found:', todo);
          return null;
        }

        return editingTodo === todoId ? (
          <EditTodo
            key={`edit-${todoId}`}
            todo={todo}
          />
        ) : (
          <TodoItem
            key={todoId}
            todo={todo}
          />
        );
      })}
    </div>
  );
});

TodoList.displayName = 'TodoList';

export default TodoList;