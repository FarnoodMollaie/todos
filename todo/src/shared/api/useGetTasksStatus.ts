import { useQuery } from "@tanstack/react-query";
import { http } from "../../components/apiServices";
import type { ResponseTypes } from "../types/responseTypes";
import { endpoints } from "../../components/apiServices/endpoints";

type statusResponse = ResponseTypes & {
  data: { allTasks: number; activeTodos: number; completedTodos: number };
};
export const useGetTasksStatus = () => {
  const { data: tasksStatus } = useQuery({
    queryKey: ["tasksStatus"],
    queryFn: async () => {
      const result = await http.get<statusResponse>(endpoints.tasksStatus);
      return result?.data;
    },
  });
  return { tasksStatus };
};
