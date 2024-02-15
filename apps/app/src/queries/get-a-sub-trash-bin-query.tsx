import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useASubTrashbinQuery = (id: number | undefined) => {
    return useQuery({
        queryKey: ["getASubTrashBin"],
        queryFn: () => fetch(API_URL + `/trash-bin/id/${id}/extend`).then((res) => res.json()),
    });
};
