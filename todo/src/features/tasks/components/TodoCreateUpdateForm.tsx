import { useEffect, useState, type FormEvent } from "react";
import { Plus, Loader2, X } from "lucide-react";
import { useCreateTask } from "../api/useCreateTask";
import { useUpdateTask } from "../api/useUpdateTask";
import type { ITaskData } from "../types/todo.types";

type TodoCreateUpdateForm = {
  onCancel?: () => void;
  isEditMode: boolean;
  selectedTask: ITaskData | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<ITaskData | null>>;
};

const TodoCreateUpdateForm = ({
  onCancel,
  isEditMode = false,
  selectedTask,
  setSelectedTask,
}: TodoCreateUpdateForm) => {
  const { createTask, isCreatingTask } = useCreateTask();
  const { updateTask, isUpdatingTask } = useUpdateTask();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      setTitle(selectedTask?.title!);
    } else {
      setTitle("");
      setSelectedTask(null);
    }
  }, [isEditMode]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title is required.");
      return;
    }

    if (trimmedTitle.length > 120) {
      setError("Task title must be under 120 characters.");
      return;
    }

    setError("");

    if (isEditMode) {
      updateTask(
        { id: selectedTask?._id!, title },
        {
          onSuccess: (result) => {
            if (result.isSuccess) {
              onCancel?.();
            }
          },
        },
      );
    } else {
      createTask({ title: trimmedTitle });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="todo-title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Task title
        </label>

        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="e.g. Learn NestJS authentication"
          maxLength={120}
          disabled={isCreatingTask || isUpdatingTask}
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
            error
              ? "border-red-400 focus:ring-red-100"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
          }`}
        />

        <div className="mt-2 flex justify-between text-xs">
          <span className={error ? "text-red-500" : "text-slate-400"}>
            {error || "Give your task a clear, descriptive name."}
          </span>
          <span className="text-slate-400">{title?.length}/120</span>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isCreatingTask || isUpdatingTask}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isCreatingTask || isUpdatingTask || !title.trim()}
          className="cursor-pointer flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCreatingTask || isUpdatingTask ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              {isCreatingTask
                ? "Creating..."
                : isUpdatingTask
                  ? "Updating..."
                  : "Loading..."}
            </>
          ) : (
            <>
              <Plus size={17} />
              {isCreatingTask ? "Create Task" : "Update Task"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TodoCreateUpdateForm;
