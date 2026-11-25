import {
  CalendarDays,
  CheckCircle2,
  Circle,
  ListTodo,
  Pen,
  Trash2,
} from "lucide-react";
import { useGetTasksList } from "../api/useGetTasksList";
import { useDeleteTask } from "../api/useDeleteTask";
import { useUpdateTask } from "../api/useUpdateTask";
import type { ITaskData } from "../types/todo.types";

const TodoList = ({
  setIsEditMode,
  setOpenCreateUpdateModal,
  setSelectedTask,
}: {
  setIsEditMode: (data: boolean) => void;
  setOpenCreateUpdateModal: (data: boolean) => void;
  setSelectedTask: React.Dispatch<React.SetStateAction<ITaskData | null>>;
}) => {
  const { tasksList } = useGetTasksList();
  const { deleteTask } = useDeleteTask();
  const { updateTask } = useUpdateTask();
  console.log("🚀 ~ TodoList ~ tasksList:", tasksList);

  return (
    <div className="divide-y divide-slate-100">
      {tasksList?.data?.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-4 rounded-2xl bg-slate-100 p-5">
            <ListTodo size={30} className="text-slate-400" />
          </div>
          <h3 className="font-semibold">No tasks found</h3>
          <p className="mt-2 text-sm text-slate-400">
            Try changing the filter or adding a new task.
          </p>
        </div>
      ) : (
        tasksList?.data?.map((todo) => (
          <div
            key={todo._id}
            className="group flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50"
          >
            <button
              //   onClick={() => toggleTodo(todo.id)}
              aria-label={
                todo.completed
                  ? "Mark task as incomplete"
                  : "Mark task as complete"
              }
              className="shrink-0"
            >
              {todo.completed ? (
                <CheckCircle2
                  size={23}
                  className="text-emerald-500 cursor-pointer"
                  onClick={() =>
                    updateTask({ id: todo?._id, completed: false })
                  }
                />
              ) : (
                <Circle
                  size={23}
                  className="text-slate-300 hover:text-indigo-500 cursor-pointer"
                  onClick={() => updateTask({ id: todo?._id, completed: true })}
                />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-medium ${
                  todo.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-800"
                }`}
              >
                {todo.title}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <CalendarDays size={13} />
                {/* {new Date(todo.createdAt).toLocaleDateString()} */}
              </p>
            </div>

            <span
              className={`hidden rounded-full px-3 py-1 text-xs font-medium sm:block ${
                todo.completed
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {todo.completed ? "Completed" : "In progress"}
            </span>

            <button
              onClick={() => {
                setIsEditMode(true);
                setOpenCreateUpdateModal(true);
                setSelectedTask(todo);
              }}
              aria-label={`update ${todo.title}`}
              className="rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <Pen size={18} />
            </button>
            <button
              onClick={() => deleteTask(todo?._id)}
              aria-label={`Delete ${todo.title}`}
              className="rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
