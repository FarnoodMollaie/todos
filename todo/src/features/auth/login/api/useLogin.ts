import { useMutation } from "@tanstack/react-query";
import { http } from "../../../../components/apiServices";
import { endpoints } from "../../../../components/apiServices/endpoints";

export const useLogin = () => {
  const { mutate: login, isPending: isLoggedIn } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: String;
    }) => {
      const result = await http.post<{
        isSuccess: boolean;
        email: string;
      }>(endpoints.loginEndpoint, {
        email,
        password,
      });
      console.log("🚀 ~ useLogin ~ result:", result);
      return result;
    },
  });
  return { login, isLoggedIn };
};
