import { useQuery } from "@tanstack/react-query";
import { http } from "../../components/apiServices";
import { endpoints } from "../../components/apiServices/endpoints";
import type { ResponseTypes } from "../types/responseTypes";

type IUserProfile = ResponseTypes & {
  data: { email: string };
};
export const useGetUserProfile = () => {
  const { data: userProfile, isFetching: isGettingProfile } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await http.get<IUserProfile>(
        endpoints.userProfileEndpoint,
      );
      if (result.isSuccess) {
        return result.data;
      }
    },
  });
  return { userProfile, isGettingProfile };
};
