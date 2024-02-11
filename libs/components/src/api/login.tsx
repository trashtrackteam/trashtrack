import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export const useGetUserQuery = (username: string) => {
    return useQuery({
        queryKey: ["getUser"],
        queryFn: () => fetch(API_URL + `/user/username/${username}`).then((res) => res.json()),
        enabled: false,
    });
};

export const useComparePasswordMutation = (username: string, password: string) => {
    return useMutation({
        mutationKey: ["comparePassword"],
        mutationFn: () =>
            fetch(API_URL + `/user/compare-password/${username}`, {
                method: "POST",
                body: JSON.stringify({ password }),
            }).then((res) => res.json()),
    });
};
