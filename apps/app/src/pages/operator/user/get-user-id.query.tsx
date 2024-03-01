import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useGetUserById = (userId: number) => {
    return useQuery({
        queryKey: ["useGetUserById", userId],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/user/id/${userId}`,
                method: "GET",
            }).then((res) => res.data),
    });
};
