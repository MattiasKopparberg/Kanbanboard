import { useTodos } from "../contexts/TodoContext";
import type { Todo } from "../types/Todo";
import { ActionType } from "../reducers/todoReducer";

interface Props {
  todo: Todo;
}

    const statuses = ["todo", "doing", "done"] as const;

export default function TodoCard({ todo }: Props) {
  const { dispatch } = useTodos();

  const handleMove = (direction: "forward" | "backward") => {
    const currentIndex = statuses.indexOf(todo.status);
    let newIndex = currentIndex;

    if (direction === "forward" && currentIndex < statuses.length - 1) newIndex++;
    if (direction === "backward" && currentIndex > 0) newIndex--;

    if (newIndex !== currentIndex) {
      dispatch({ type: ActionType.MOVE, id: todo.id, status: statuses[newIndex] });
    }
  };

  const handleDelete = () => dispatch({ type: ActionType.REMOVE, id: todo.id });
  const handleEdit = () => dispatch({ type: ActionType.SET_FOCUSED_TODO, id: todo.id });

  return (
    <div
      className="bg-white border rounded shadow-sm p-3 mb-2 text-left cursor-pointer hover:shadow-md transition"
      onClick={handleEdit}
    >
      <h4 className="font-medium text-gray-900">{todo.title}</h4>
      {todo.content && <p className="text-sm text-gray-600 mt-1">{todo.content}</p>}

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-xs border rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleMove("backward");
            }}
          >
            ←
          </button>
          <button
            className="px-2 py-1 text-xs border rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleMove("forward");
            }}
          >
            →
          </button>
        </div>
        <button
          className="px-2 py-1 text-xs border text-red-600 rounded"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
