import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";

export const useGetReportByNik = (nik: string) => {
    return useQuery({
        queryKey: ["getReportByNik", nik],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/report/no-image/nik/${nik}`,
                method: "GET",
            }).then((res) => res.data),
    });
};
