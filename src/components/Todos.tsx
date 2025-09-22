import React, { useState } from "react";
import type { TodoStatus } from "../types/Todo";
import { useTodoState } from "../contexts/todoContext";
import TodoCard from "./TodoCard";

interface Props {
  title: string;
  status: TodoStatus;
}

export default function Todos({ title, status }: Props) {
  const { todos, addTodo } = useTodoState();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const filtered = todos.filter((t) => t.status === status);

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    const title = newTitle.trim();
    const content = newContent.trim();
    if (!title) return;
    addTodo(title, content);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="flex-1 min-w-[14rem] p-4 bg-gray-50 border rounded">
      <h3 className="font-semibold text-lg">{title}</h3>
      {status === "todo" && (
        <form onSubmit={handleAdd} className="mt-3" onClick={(e) => e.stopPropagation()}>
          <input
            className="w-full px-3 py-2 border rounded text-sm mb-2"
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            className="w-full px-3 py-2 border rounded text-sm mb-2"
            rows={2}
            placeholder="Optional description"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Add
          </button>
        </form>
      )}
      <div className="mt-4 flex flex-col">
        {filtered.map((t) => (
          <TodoCard key={t.id} todo={t} />
        ))}
      </div>
    </div>
  );
}
