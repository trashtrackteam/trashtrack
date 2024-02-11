import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useGetTempahSampahQuery = (id: number) => {
    return useQuery({
        queryKey: ["getTempahSampah"],
        queryFn: () => fetch(API_URL + `/report/nik/${id}`).then((res) => res.json()),
    });
};
