import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";

export const useGetReportById = (reportId: number) => {
    return useQuery({
        queryKey: ["getReportById", reportId],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/report/id/${reportId}`,
                method: "GET",
            }).then((res) => res.data),
    });
};
