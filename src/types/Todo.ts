
export interface Todo {
  id?: string;
  _id?: string; // For MongoDB compatibility
  title: string;
  description?: string;
  isCompleted: boolean;
  completed?: boolean; // For API compatibility
  isDeleted: boolean;
  deleted?: boolean; // For API compatibility
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  isCompleted?: boolean;
  isDeleted?: boolean;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  completed?: boolean;
  isDeleted?: boolean;
  deleted?: boolean;
}

export interface ApiTodoResponse {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  deleted?: boolean;
  createdAt: string;
  updatedAt?: string;
}