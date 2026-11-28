import { Plus } from "lucide-react";
import type React from "react";
import type { FC } from "react";
import { useGetUserProfile } from "../../api/useGetUserProfile";

interface IPanelPageHeader {
  setOpenCreateUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCreateTaskButton?: boolean;
}
const PanelPageHeader: FC<IPanelPageHeader> = ({
  setOpenCreateUpdateModal,
  showCreateTaskButton = false,
}) => {
  const { userProfile } = useGetUserProfile();

  const email = userProfile?.email ?? "User";
  const username = email.split("@")[0];
  return (
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
      {showCreateTaskButton && (
        <button
          onClick={() => setOpenCreateUpdateModal(true)}
          className="cursor-pointer flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          New Task
        </button>
      )}
    </div>
  );
};

export default PanelPageHeader;
