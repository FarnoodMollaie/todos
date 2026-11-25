import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../components/apiServices";
import type { ResponseTypes } from "../../../shared/types/responseTypes";
import { endpoints } from "../../../components/apiServices/endpoints";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: async (id: string) => {
      const result = await http.delete<ResponseTypes>(endpoints.updateTask(id));
      if (result.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
  return { deleteTask, isDeletingTask };
};
