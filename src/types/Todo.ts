
export interface Todo {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  completed?: boolean; 
  isDeleted: boolean;
  deleted?: boolean; 
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