import { useState, useEffect } from "react";
import { useTodos } from "../contexts/TodoContext";
import type { TodoStatus } from "../types/Todo";
import { ActionType } from "../reducers/todoReducer";

export default function TodoModal() {
  const { state, dispatch } = useTodos();
  const todo = state.todos.find((t) => t.id === state.focusedTodoId);

  const [title, setTitle] = useState(todo?.title ?? "");
  const [content, setContent] = useState(todo?.content ?? "");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setContent(todo.content ?? "");
    }
  }, [todo]);

  if (!todo) return null;

  const statuses: TodoStatus[] = ["todo", "doing", "done"];

  const handleSave = () => {
    dispatch({ type: ActionType.EDIT, id: todo.id, title, content });
    dispatch({ type: ActionType.SET_FOCUSED_TODO, id: null });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => dispatch({ type: ActionType.SET_FOCUSED_TODO, id: null })}
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
                onClick={() =>
                  dispatch({ type: ActionType.MOVE, id: todo.id, status: s })
                }
              >
                Move to {s}
              </button>
            ))}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-3 py-1 border rounded text-red-600"
            onClick={() => dispatch({ type: ActionType.REMOVE, id: todo.id })}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
