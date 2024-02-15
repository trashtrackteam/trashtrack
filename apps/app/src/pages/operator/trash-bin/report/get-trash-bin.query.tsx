import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";

export const useGetTrashBinById = (trashBinId: number, userId: number) => {
    return useQuery({
        queryKey: ["getTrashBinById", trashBinId, userId],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/trash-bin/id/${trashBinId}`,
                method: "GET",
            }).then((res) => res.data),
        enabled: !!userId,
    });
};
