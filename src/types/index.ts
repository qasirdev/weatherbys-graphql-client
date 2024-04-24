export interface User {
  id: string,
  fullName: string;
  email: string;
  todos: Todo[];
}

export interface Todo {
  id: string,
  title: string,
  completed: boolean,
  user: User,
  userId: string,
}
