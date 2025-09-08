import { CSSProperties } from "react";

type Styles = {
  [key: string]: CSSProperties;
};

export const styles: Styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  error: {
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #000",
    backgroundColor: "#ffebee",
    color: "#d32f2f",
  },
  errorButton: {
    float: "right",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  createSection: {
    marginBottom: "30px",
    padding: "15px",
    border: "1px solid #000",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #000",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    border: "1px solid #000",
    resize: "vertical",
  },
  button: {
    padding: "10px 20px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  buttonDisabled: {
    padding: "10px 20px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  todoItem: {
    marginBottom: "15px",
    padding: "15px",
    border: "1px solid #000",
    backgroundColor: "#fff",
  },
  todoItemCompleted: {
    marginBottom: "15px",
    padding: "15px",
    border: "1px solid #000",
    backgroundColor: "#f5f5f5",
  },
  todoHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  checkbox: {
    marginRight: "10px",
    transform: "scale(1.2)",
  },
  todoTitle: {
    margin: "0",
    flex: 1,
  },
  todoTitleCompleted: {
    margin: "0",
    textDecoration: "line-through",
    color: "#666",
    flex: 1,
  },
  description: {
    margin: "0 0 10px 0",
    color: "#333",
    lineHeight: "1.4",
  },
  descriptionCompleted: {
    margin: "0 0 10px 0",
    color: "#666",
    lineHeight: "1.4",
  },
  metadata: {
    fontSize: "0.8em",
    color: "#666",
    marginBottom: "10px",
  },
  smallButton: {
    padding: "5px 10px",
    marginRight: "5px",
    border: "1px solid #000",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  editForm: {
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #000",
  },
  emptyState: {
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    padding: "20px",
  },
};
