import {
  CheckCircle2,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { route } from "../../../components/routes/route";
import LogoutModal from "../../../features/auth/logout";
import { useGetUserProfile } from "../../api/useGetUserProfile";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const { userProfile, isGettingProfile } = useGetUserProfile();

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
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {" "}
        <div className="flex h-full flex-col p-6">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <CheckCircle2 size={23} />
              </div>
              <span className="text-xl font-bold tracking-tight">TaskFlow</span>
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
            <NavLink
              to={route.dashboardPath}
              className={({ isActive }) =>
                `${
                  isActive ? "text-indigo-700 bg-indigo-50 font-medium" : ""
                } flex w-full items-center gap-3 rounded-xl  px-4 py-3 text-left `
              }
            >
              <LayoutDashboard size={19} />
              Dashboard
            </NavLink>
            <NavLink
              to={route.activeTaskPath}
              className={({ isActive }) =>
                `${
                  isActive ? "text-indigo-700 bg-indigo-50 font-medium" : ""
                } flex w-full items-center gap-3 rounded-xl  px-4 py-3 text-left `
              }
            >
              <ListTodo size={19} />
              Active Tasks
            </NavLink>
            <NavLink
              to={route.completedTaskPath}
              className={({ isActive }) =>
                `${
                  isActive ? "text-indigo-700 bg-indigo-50 font-medium" : ""
                } flex w-full items-center gap-3 rounded-xl  px-4 py-3 text-left `
              }
            >
              <CheckCircle2 size={19} />
              Completed
            </NavLink>
          </nav>

          <div className="mt-auto">
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
              <LogOut
                size={17}
                className="text-slate-400 cursor-pointer"
                onClick={() => setOpenLogoutModal(true)}
              />
            </div>
          </div>
        </div>
      </aside>
      <main className="min-h-screen px-5 py-8 md:ml-64 md:px-10 md:py-10">
        <Outlet />
      </main>

      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}
      <LogoutModal
        modalOpen={openLogoutModal}
        setModalOpen={setOpenLogoutModal}
      />
    </div>
  );
};

export default Layout;
