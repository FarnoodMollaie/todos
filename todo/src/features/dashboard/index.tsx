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

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

type Filter = "all" | "active" | "completed";

const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Complete NestJS authentication",
    completed: true,
    createdAt: "2026-11-21",
  },
  {
    id: "2",
    title: "Implement refresh token rotation",
    completed: true,
    createdAt: "2026-11-22",
  },
  {
    id: "3",
    title: "Build Todo dashboard UI",
    completed: false,
    createdAt: "2026-11-24",
  },
  {
    id: "4",
    title: "Connect React with NestJS API",
    completed: false,
    createdAt: "2026-11-24",
  },
  {
    id: "5",
    title: "Write API integration tests",
    completed: false,
    createdAt: "2026-11-23",
  },
];

const Dashboard = () => {
  const { userProfile, isGettingProfile } = useGetUserProfile();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITaskData | null>(null);
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [filter, setFilter] = useState<Filter>("all");
  const [openCreateUpdateModal, setOpenCreateUpdateModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;
  const progress = todos.length
    ? Math.round((completed / todos.length) * 100)
    : 0;

  const email = userProfile?.email ?? "User";
  const username = email.split("@")[0];
  const initial = username.charAt(0).toUpperCase();

  if (isGettingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:hidden">
          <span className="text-xl font-bold tracking-tight">
            Task<span className="text-indigo-600">Flow</span>
          </span>
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white transition-transform md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col p-6">
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <CheckCircle2 size={23} />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  TaskFlow
                </span>
              </div>
              <button
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </p>

            <nav className="space-y-2">
              <button
                onClick={() => {
                  setFilter("all");
                  setSidebarOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-left font-medium text-indigo-700"
              >
                <LayoutDashboard size={19} />
                Dashboard
              </button>
              <button
                onClick={() => {
                  setFilter("active");
                  setSidebarOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                <ListTodo size={19} />
                Active Tasks
              </button>
              <button
                onClick={() => {
                  setFilter("completed");
                  setSidebarOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                <CheckCircle2 size={19} />
                Completed
              </button>
            </nav>

            <div className="mt-auto">
              <div className="mb-5 rounded-2xl bg-indigo-50 p-4">
                <p className="mb-2 text-sm font-semibold text-indigo-900">
                  Keep it going!
                </p>
                <p className="mb-4 text-xs leading-relaxed text-indigo-700">
                  You're making great progress on your tasks.
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-indigo-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-indigo-700">
                  {progress}% completed
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold capitalize">
                    {username}
                  </p>
                  <p className="truncate text-xs text-slate-400">{email}</p>
                </div>
                <LogOut size={17} className="text-slate-400" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-h-screen px-5 py-8 md:ml-64 md:px-10 md:py-10">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-medium text-indigo-600">
                  Your workspace
                </p>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome back, {username} 👋
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Here's what's happening with your tasks today.
                </p>
              </div>

              <button
                onClick={() => setOpenCreateUpdateModal(true)}
                className="cursor-pointer flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <Plus size={18} />
                New Task
              </button>
            </div>

            {/* Statistics */}
            <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Total Tasks",
                  value: todos.length,
                  icon: ListTodo,
                  color: "bg-indigo-50 text-indigo-600",
                },
                {
                  label: "In Progress",
                  value: active,
                  icon: Clock3,
                  color: "bg-amber-50 text-amber-600",
                },
                {
                  label: "Completed",
                  value: completed,
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
                  <p className="text-4xl font-bold tracking-tight">
                    {stat.value}
                  </p>
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
                    You've completed {completed} out of {todos.length} tasks.
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
            />

            <p className="mt-8 text-center text-xs text-slate-400">
              TaskFlow · Built with React & NestJS
            </p>
          </div>
        </main>

        {sidebarOpen && (
          <button
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}
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
