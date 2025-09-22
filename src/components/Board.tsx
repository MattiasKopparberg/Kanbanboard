import Todos from "./Todos.tsx";
import TodoModal from "./TodoModal";
import { useParams, Link } from "react-router-dom";

const columns = [
  { title: "Todo", status: "todo" },
  { title: "Doing", status: "doing" },
  { title: "Done", status: "done" },
] as const;

export default function Board() {
  const params = useParams();
  const focusedColumn = params.status as string | undefined;

  const filteredColumns = focusedColumn
    ? columns.filter((c) => c.status === focusedColumn)
    : columns;

  return (
    <div className="p-6 min-h-screen bg-gray-50 w-full text-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-around mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">My Todos</h1>
          {focusedColumn && (
            <Link
              to="/board"
              className="px-3 py-1 bg-white border rounded shadow-sm text-sm text-gray-800 hover:bg-gray-100"
            >
              Show all columns
            </Link>
          )}
        </div>
<div className="flex gap-4 w-full">
  {filteredColumns.map((c) => (
    <div key={c.status} className="flex-1">
      <Link to={`/board/${c.status}`} className="block mb-2 text-blue-600 hover:underline">
        View {c.title} only
      </Link>
      <Todos title={c.title} status={c.status} />
    </div>
  ))}
</div>
      </div>
      <TodoModal />
    </div>
  );
}
