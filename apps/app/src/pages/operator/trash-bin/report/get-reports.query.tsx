import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";

export const useGetReports = () => {
    return useQuery({
        queryKey: ["getReports"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/report/no-image`,
                method: "GET",
            }).then((res) => res.data),
    });
};
