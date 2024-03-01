import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["getUsers"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/user`,
                method: "GET",
            }).then((res) => res.data),
    });
};
