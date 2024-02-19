import { useQueries, useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";
import { useMemo } from "react";
import { EnumResponseStatus, InterfaceReport, InterfaceTrashbin } from "./reports.page";

export interface InterfaceResult {
    id: number;
    trashBinId: number;
    trashBinName: string;
    userId: number;
    nik: string;
    name: string;
    phoneNumber: string;
    description: string;
    status: EnumResponseStatus;
}

export const useGetReportsWithTrashBins = () => {
    const results = useQueries({
        queries: [
            {
                queryKey: ["getReports"],
                queryFn: () =>
                    CapacitorHttp.request({
                        url: API_URL + `/report/no-image`,
                        method: "GET",
                    }).then((res) => res.data),
            },
            {
                queryKey: ["getTrashBins"],
                queryFn: () =>
                    CapacitorHttp.request({
                        url: API_URL + `/trash-bin`,
                        method: "GET",
                    }).then((res) => res.data),
            },
        ],
    });

    return {
        reports: results[0].data,
        trashBins: results[1].data,
        isReportsLoading: results[0].isLoading,
        isTrashBinsLoading: results[1].isLoading,
    };
};
