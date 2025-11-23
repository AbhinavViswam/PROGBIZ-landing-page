import { useQuery } from "@tanstack/react-query";
import { getUser } from "./user.api";

export const useUser = () => {
  return useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
};
