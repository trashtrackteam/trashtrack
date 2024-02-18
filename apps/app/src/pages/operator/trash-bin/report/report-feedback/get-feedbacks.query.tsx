import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";

export const useGetFeedbacks = () => {
    return useQuery({
        queryKey: ["getFeedbacks"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/feedback`,
                method: "GET",
            }).then((res) => res.data),
    });
};
