import { useState } from "react";
import { useTodos } from "../contexts/TodoContext";
import { ActionType } from "../reducers/todoReducer";

export default function AddTodoForm() {
  const { dispatch } = useTodos();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    dispatch({ type: ActionType.ADD, title, content: newContent.trim() });
    setNewTitle("");
    setNewContent("");
  };

  return (
    <form
      onSubmit={handleAdd}
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-3 items-stretch mb-6"
    >
      <input
        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        placeholder="Task title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
        rows={2}
        placeholder="Optional description"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition shadow"
      >
        Add Task
      </button>
    </form>
  );
}
