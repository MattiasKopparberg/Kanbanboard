import type { Todo, TodoStatus } from "../types/Todo";

export const ActionType = {
  ADD: "ADD",
  MOVE: "MOVE",
  EDIT: "EDIT",
  REMOVE: "REMOVE",
  SET_FOCUSED_TODO: "SET_FOCUSED_TODO",
} as const;

export type Action =
  | { type: typeof ActionType.ADD; title: string; content?: string }
  | { type: typeof ActionType.MOVE; id: number; status: TodoStatus }
  | { type: typeof ActionType.EDIT; id: number; title: string; content?: string }
  | { type: typeof ActionType.REMOVE; id: number }
  | { type: typeof ActionType.SET_FOCUSED_TODO; id: number | null };

export type TodoState = {
  todos: Todo[];
  focusedTodoId: number | null;
};

export const initialState: TodoState = {
  todos: [],
  focusedTodoId: null,
};

export function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case ActionType.ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.title,
            content: action.content ?? "",
            status: "todo",
          },
        ],
      };

    case ActionType.MOVE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, status: action.status } : todo
        ),
      };

    case ActionType.EDIT:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, title: action.title, content: action.content ?? "" }
            : todo
        ),
      };

    case ActionType.REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case ActionType.SET_FOCUSED_TODO:
      return {
        ...state,
        focusedTodoId: action.id,
      };

    default:
      return state;
  }
}
