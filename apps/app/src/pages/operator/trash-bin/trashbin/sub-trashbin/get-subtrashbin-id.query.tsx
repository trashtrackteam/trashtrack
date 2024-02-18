import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useGetSubTrashBinById = (subtrashBinId: number) => {
    return useQuery({
        queryKey: ["useGetSubTrashBinById", subtrashBinId],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/sub-trash-bin/id/${subtrashBinId}`,
                method: "GET",
            }).then((res) => res.data),
    });
};
