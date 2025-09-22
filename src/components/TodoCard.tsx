import React from "react";
import type { Todo } from "../types/Todo";
import { useTodoState } from "../contexts/todoContext";

interface Props {
  todo: Todo;
}

export default function TodoCard({ todo }: Props) {
  const { setFocusedTodoId } = useTodoState();

  return (
    <div
      onClick={() => setFocusedTodoId(todo.id)}
      className="p-3 mt-3 rounded border bg-white shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-400 text-left"
    >
      <h4 className="font-medium">{todo.title}</h4>
      {todo.content && <p className="text-sm text-gray-600 mt-1 line-clamp-3">{todo.content}</p>}
    </div>
  );
}
