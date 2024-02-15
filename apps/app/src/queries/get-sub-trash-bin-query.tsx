import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useSubTrashBinQuery = () => {
    return useQuery({
        queryKey: ["getSubTrashBin"],
        queryFn: () => fetch(API_URL + `/sub-trash-bin`).then((res) => res.json()),
    });
};
