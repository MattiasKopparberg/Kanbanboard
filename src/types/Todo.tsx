export type TodoStatus = "todo" | "doing" | "done";

export interface Todo {
  id: number;
  title: string;
  content?: string;
  status: TodoStatus;
}

export interface TodoState {
  todos: Todo[];
  addTodo: (title: string, content?: string) => void;
  moveTodo: (id: number, status: TodoStatus) => void;
  editTodo: (id: number, title: string, content: string) => void;
  deleteTodo: (id: number) => void;
  focusedTodoId: number | null;
  setFocusedTodoId: (id: number | null) => void;
}
