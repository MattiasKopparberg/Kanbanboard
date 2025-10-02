import { useTodos } from "../contexts/TodoContext";
import type { TodoStatus } from "../types/Todo";
import TodoCard from "./TodoCard";

interface Props {
  status: TodoStatus;
  title: string;
}

export default function Todos({ status, title }: Props) {
  const { state } = useTodos();
  const filtered = state.todos.filter((t) => t.status === status);

  return (
    <div className="flex-1 w-full p-4 bg-gray-50 border rounded min-w-[14rem]">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="flex flex-col">
        {filtered.map((t) => (
          <TodoCard key={t.id} todo={t} />
        ))}
      </div>
    </div>
  );
}
