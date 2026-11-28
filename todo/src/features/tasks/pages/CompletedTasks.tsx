import { useState } from "react";
import { useGetTasksList } from "../api/useGetTasksList";
import { TodoStatus } from "../types/todo.enum";
import type { ITaskData } from "../types/todo.types";
import TodoList from "../components/TodoList";
import Modal from "../../../shared/ui/modal";
import TodoCreateUpdateForm from "../components/TodoCreateUpdateForm";
import PanelPageHeader from "../../../shared/ui/panelPageHeader";

const CompletedTasks = () => {
  const { tasksList } = useGetTasksList({
    status: TodoStatus.COMPLETED,
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITaskData | null>(null);
  const [openCreateUpdateModal, setOpenCreateUpdateModal] =
    useState<boolean>(false);
  return (
    <>
      <PanelPageHeader setOpenCreateUpdateModal={setOpenCreateUpdateModal} />

      <TodoList
        setIsEditMode={setIsEditMode}
        setOpenCreateUpdateModal={setOpenCreateUpdateModal}
        setSelectedTask={setSelectedTask}
        tasksList={tasksList!}
      />

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

export default CompletedTasks;
