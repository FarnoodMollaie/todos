import { useMutation } from "@tanstack/react-query";
import { http } from "../../../../components/apiServices";
import { endpoints } from "../../../../components/apiServices/endpoints";

export const useRegister = () => {
  const { mutate: registerFn, isPending: isRegistering } = useMutation({
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
      }>(endpoints.registerEndpoint, {
        email,
        password,
      });
      return result;
    },
  });
  return { registerFn, isRegistering };
};
