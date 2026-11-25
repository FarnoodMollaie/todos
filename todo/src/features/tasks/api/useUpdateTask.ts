import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../components/apiServices";
import { endpoints } from "../../../components/apiServices/endpoints";
import type { ResponseTypes } from "../../../shared/types/responseTypes";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationFn: async ({
      id,
      title,
      completed,
    }: {
      id: string;
      title?: string;
      completed?: boolean;
    }) => {
      const result = await http.patch<ResponseTypes>(endpoints.updateTask(id), {
        title,
        completed,
      });
      if (result.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
      return result;
    },
  });
  return { updateTask, isUpdatingTask };
};
