import React from "react";
import { styles } from "../styles/appStyles";

interface TodoHeaderProps {
  todosCount: number;
}

const TodoHeaderComponent: React.FC<TodoHeaderProps> = ({ todosCount }) => {
  return (
    <>
      <h1 style={styles.title}>Todo App</h1>
      <h2>Your Todos ({todosCount})</h2>
    </>
  );
};

const TodoHeader = React.memo(TodoHeaderComponent);
TodoHeader.displayName = "TodoHeader";

export default TodoHeader;