import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:3000/api/product",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    save: mutation.mutate,
    isPending: mutation.isPending,
  };
};
