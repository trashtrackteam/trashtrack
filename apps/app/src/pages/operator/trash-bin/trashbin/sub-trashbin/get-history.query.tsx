import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";

export const useGetHistories = () => {
    return useQuery({
        queryKey: ["useGetHistories"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/history`,
                method: "GET",
            }).then((res) => res.data),
    });
};
