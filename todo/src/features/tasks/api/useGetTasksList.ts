import { useQuery } from "@tanstack/react-query";
import { http } from "../../../components/apiServices";
import type { ResponseTypes } from "../../../shared/types/responseTypes";
import { endpoints } from "../../../components/apiServices/endpoints";
import type { ITaskData } from "../types/todo.types";

export const useGetTasksList = () => {
  const { data: tasksList, isFetching: isGettingTasksList } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const result = await http.get<ResponseTypes & { data: ITaskData[] }>(
        endpoints.getTasksList,
      );
      return result;
    },
  });
  return { tasksList, isGettingTasksList };
};
