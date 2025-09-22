import React, { useState } from "react";
import { useTodoState } from "../contexts/todoContext";
import type { TodoStatus } from "../types/Todo";

export default function TodoModal() {
  const { todos, focusedTodoId, setFocusedTodoId, moveTodo, editTodo, deleteTodo } = useTodoState();

  const todo = todos.find((t) => t.id === focusedTodoId);

  const [title, setTitle] = useState(todo ? todo.title : "");
  const [content, setContent] = useState(todo ? todo.content : "");

  if (focusedTodoId === null || !todo) return null;

  const statuses: TodoStatus[] = ["todo", "doing", "done"];

  const handleSave = () => {
    editTodo(todo.id, title, content);
    setFocusedTodoId(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => setFocusedTodoId(null)}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">Edit Task</h2>
        <input
          className="w-full border p-2 rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded mb-2"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex gap-2 mb-2">
          {statuses
            .filter((s) => s !== todo.status)
            .map((s) => (
              <button
                key={s}
                className="px-3 py-1 border rounded text-sm"
                onClick={() => moveTodo(todo.id, s)}
              >
                Move to {s}
              </button>
            ))}
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleSave}>
            Save
          </button>
                    <button
                      className="px-3 py-1 border rounded text-red-600"
                      onClick={() => {
                        deleteTodo(todo.id);
                        setFocusedTodoId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          }
         