import { createContext, useContext, useReducer, type ReactNode } from "react";
import { todoReducer, initialState, type TodoState, type Action } from "../reducers/todoReducer";

type TodoContextValue = {
  state: TodoState;
  dispatch: React.Dispatch<Action>;
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
}
