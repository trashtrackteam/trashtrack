import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useTrashBinQuery = () => {
    return useQuery({
        queryKey: ["getTrashBin"],
        queryFn: () => fetch(API_URL + `/trash-bin`).then((res) => res.json()),
    });
};
