import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";

export const useGetSubTrashbins = () => {
    return useQuery({
        queryKey: ["useGetSubTrashbins"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/sub-trash-bin`,
                method: "GET",
            }).then((res) => res.data),
    });
};
