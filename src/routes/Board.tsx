import { useParams, Link } from "react-router-dom";
import Todos from "../components/Todos";
import TodoModal from "../components/TodoModal";
import AddTodoForm from "../components/AddTodoForm";

const columns = [
  { title: "Todo", status: "todo" },
  { title: "Doing", status: "doing" },
  { title: "Done", status: "done" },
] as const;

export default function Board() {

const params = useParams();
const focusedColumn = params.status;

const filteredColumns = focusedColumn
  ? columns.filter(c => c.status === focusedColumn)
  : columns;


  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 w-full text-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-indigo-900">My Todos</h1>
          {focusedColumn && (
            <Link
              to="/board"
              className="px-3 py-1 bg-white border rounded shadow-sm text-sm text-gray-800 hover:bg-gray-100"
            >
              Show all columns
            </Link>
          )}
        </div>

        <AddTodoForm />

        <div className="flex flex-col md:flex-row gap-4 w-full mt-6">
          {filteredColumns.map((c) => (
            <div
              key={c.status}
              className="flex-1 w-full bg-white/60 backdrop-blur-md rounded-xl shadow p-4"
            >
              <Link
                to={`/board/${c.status}`}
                className="block mb-2 text-indigo-600 hover:underline font-medium"
              >
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
