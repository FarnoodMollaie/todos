import { useState } from "react";
import {
  LayoutDashboard,
  CheckCircle2,
  ListTodo,
  Clock3,
  Plus,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useGetUserProfile } from "../../shared/api/useGetUserProfile";
import TodoList from "../tasks/components/TodoList";
import Modal from "../../shared/ui/modal";
import TodoCreateUpdateForm from "../tasks/components/TodoCreateUpdateForm";
import type { ITaskData } from "../tasks/types/todo.types";
import { useGetTasksList } from "../tasks/api/useGetTasksList";
import PanelPageHeader from "../../shared/ui/panelPageHeader";
import { useGetTasksStatus } from "../../shared/api/useGetTasksStatus";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

const Dashboard = () => {
  const { isGettingProfile } = useGetUserProfile();
  const { tasksList } = useGetTasksList();
  const { tasksStatus } = useGetTasksStatus();
  console.log("🚀 ~ Dashboard ~ tasksStatus:", tasksStatus);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITaskData | null>(null);
  const [openCreateUpdateModal, setOpenCreateUpdateModal] =
    useState<boolean>(false);

  const progress = tasksList?.length!
    ? Math.round((tasksStatus?.completedTodos! / tasksList?.length!) * 100)
    : 0;

  if (isGettingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <>
      {/* Main content */}
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <PanelPageHeader
          setOpenCreateUpdateModal={setOpenCreateUpdateModal}
          showCreateTaskButton
        />

        {/* Statistics */}
        <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Tasks",
              value: tasksStatus?.allTasks,
              icon: ListTodo,
              color: "bg-indigo-50 text-indigo-600",
            },
            {
              label: "In Progress",
              value: tasksStatus?.activeTodos,
              icon: Clock3,
              color: "bg-amber-50 text-amber-600",
            },
            {
              label: "Completed",
              value: tasksStatus?.completedTodos,
              icon: CheckCircle2,
              color: "bg-emerald-50 text-emerald-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  {stat.label}
                </span>
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <stat.icon size={21} />
                </div>
              </div>
              <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-2 text-xs text-slate-400">
                {stat.label === "Total Tasks"
                  ? "All your tasks"
                  : stat.label === "Completed"
                    ? "Successfully finished"
                    : "Waiting to be completed"}
              </p>
            </div>
          ))}
        </div>

        {/* Progress banner */}
        <div className="mb-9 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-7 text-white">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className="text-xl font-semibold">
                Your productivity overview
              </h2>
              <p className="mt-2 text-sm text-indigo-100">
                You've completed {tasksStatus?.completedTodos} out of{" "}
                {tasksStatus?.allTasks} tasks.
              </p>
            </div>
            <span className="text-4xl font-bold">{progress}%</span>
          </div>
          <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tasks section */}
        <TodoList
          setIsEditMode={setIsEditMode}
          setOpenCreateUpdateModal={setOpenCreateUpdateModal}
          setSelectedTask={setSelectedTask}
          tasksList={tasksList!}
        />

        <p className="mt-8 text-center text-xs text-slate-400">
          TaskFlow · Built with React & NestJS
        </p>
      </div>

      <Modal
        open={openCreateUpdateModal}
        title="Create a new task"
        subtitle="Add something you want to accomplish."
        onClose={() => {
          setOpenCreateUpdateModal(false);
          setSelectedTask(null);
          setIsEditMode(false);
        }}
      >
        <TodoCreateUpdateForm
          onCancel={() => {
            setOpenCreateUpdateModal(false);
            setSelectedTask(null);
            setIsEditMode(false);
          }}
          selectedTask={selectedTask}
          isEditMode={isEditMode}
          setSelectedTask={setSelectedTask}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
