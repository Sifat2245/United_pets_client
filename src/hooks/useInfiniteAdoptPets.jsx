import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const fetchPets = async ({ pageParam = 1 }, axiosSecure) => {
  const res = await axiosSecure.get(`/pets/not-adopted?page=${pageParam}&limit=8`);
  return res.data;
};

const useInfiniteAdoptPets = () => {
  const axiosSecure = useAxiosSecure();

  return useInfiniteQuery({
    queryKey: ["not-adopted-pets"],
    queryFn: (context) => fetchPets(context, axiosSecure),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
  });
};

export default useInfiniteAdoptPets;