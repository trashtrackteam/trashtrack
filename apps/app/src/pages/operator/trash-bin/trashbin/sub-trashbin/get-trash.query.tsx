import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";

export const useGetTrashes = () => {
    return useQuery({
        queryKey: ["useGetTrashes"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/trash`,
                method: "GET",
            }).then((res) => res.data),
    });
};
