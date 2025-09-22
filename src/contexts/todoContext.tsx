import React, { createContext, useCallback, useMemo, useState } from "react";
import type { Todo, TodoState, TodoStatus } from "../types/Todo";

export type TodoContextType = TodoState;

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [focusedTodoId, setFocusedTodoId] = useState<number | null>(null);

  const addTodo = useCallback((title: string, content = "") => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), title: title.trim(), content: content.trim(), status: "todo" },
    ]);
  }, []);

  const moveTodo = useCallback((id: number, status: TodoStatus) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  const editTodo = useCallback((id: number, title: string, content: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title, content } : t)));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setFocusedTodoId((current) => (current === id ? null : current));
  }, []);

  const value = useMemo<TodoContextType>(
    () => ({ todos, addTodo, moveTodo, editTodo, deleteTodo, focusedTodoId, setFocusedTodoId }),
    [todos, focusedTodoId, addTodo, moveTodo, editTodo, deleteTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoState = () => {
  const ctx = React.useContext(TodoContext);
  if (!ctx) throw new Error("useTodoState must be used inside TodoProvider");
  return ctx;
};
