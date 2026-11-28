import { type FC } from "react";
import Modal from "../../../shared/ui/modal";
import { useLogout } from "./api/useLogout";

interface ILogoutModal {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LogoutModal: FC<ILogoutModal> = ({ modalOpen, setModalOpen }) => {
  const { logoutHandler, isLoggingOut } = useLogout();

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Are you sure you want to logout?"
    >
      <div className="flex gap-x-2 justify-end">
        <button
          className="bg-indigo-600 px-5 py-3 text-sm font-semibold text-white cursor-pointer rounded-md"
          onClick={() => {
            logoutHandler();
          }}
          disabled={isLoggingOut}
          aria-disabled={isLoggingOut}
        >
          Logout
        </button>
        <button
          className="bg-red-500 px-5 py-3 text-sm font-semibold text-white cursor-pointer rounded-md"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
