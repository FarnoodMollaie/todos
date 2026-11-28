import { useMutation } from "@tanstack/react-query";
import { http } from "../../../../components/apiServices";
import { endpoints } from "../../../../components/apiServices/endpoints";
import type { ResponseTypes } from "../../../../shared/types/responseTypes";
import { useNavigate } from "react-router";
import { route } from "../../../../components/routes/route";

export const useLogout = () => {
  const navigate = useNavigate();
  const { mutate: logoutHandler, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      const result = await http.post<ResponseTypes>(endpoints.logoutEndpoint);
      if (result.isSuccess) {
        navigate(route.loginPath, { replace: true });
      }
    },
  });
  return { logoutHandler, isLoggingOut };
};
