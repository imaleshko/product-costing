import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/products");
      return response.data;
    },
  });
  return {
    products: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
