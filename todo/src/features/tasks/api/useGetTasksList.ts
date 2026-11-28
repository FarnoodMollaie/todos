import { useQuery } from "@tanstack/react-query";
import { http } from "../../../components/apiServices";
import type { ResponseTypes } from "../../../shared/types/responseTypes";
import { endpoints } from "../../../components/apiServices/endpoints";
import type { ITaskData } from "../types/todo.types";
import type { TodoStatus } from "../types/todo.enum";

export const useGetTasksList = (filters?: { status: TodoStatus }) => {
  const { data: tasksList, isFetching: isGettingTasksList } = useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      const result = await http.get<ResponseTypes & { data: ITaskData[] }>(
        endpoints.getTasksList,
        { params: filters },
      );
      return result?.data;
    },
  });
  return { tasksList, isGettingTasksList };
};
