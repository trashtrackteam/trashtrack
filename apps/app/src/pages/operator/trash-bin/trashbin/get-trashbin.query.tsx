import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useGetTrashBins = () => {
    return useQuery({
        queryKey: ["getTrashBins"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/trash-bin`,
                method: "GET",
            }).then((res) => res.data),
    });
};
