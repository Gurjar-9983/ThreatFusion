
import { useMutation } from "@tanstack/react-query";

import { login } from "@/lib/services/auth";
import { useAuthStore } from "@/lib/store/auth";

export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      setToken(data.access_token);
    },
  });
}