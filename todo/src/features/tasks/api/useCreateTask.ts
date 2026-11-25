import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../components/apiServices";
import { endpoints } from "../../../components/apiServices/endpoints";
import type { ResponseTypes } from "../../../shared/types/responseTypes";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      const result = await http.post<ResponseTypes>(endpoints.createTask, {
        title,
      });
      if (result.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });
  return { createTask, isCreatingTask };
};
