import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useGetTrashBinById = (trashBinId: number) => {
    return useQuery({
        queryKey: ["useGetTrashBinById", trashBinId],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/trash-bin/id/${trashBinId}`,
                method: "GET",
            }).then((res) => res.data),
    });
};
