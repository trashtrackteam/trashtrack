import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

enum Role {
    operator = "operator",
    admin = "admin",
}

export interface IUserQuery {
    id: number;
    name: string;
    username: string;
    password: string;
    phoneNumber: string;
    role: Role;
    active: boolean;
    description: string;
}

export const useGetUserQuery = (id: string | undefined) => {
    return useQuery({
        queryKey: ["getUserQ"],
        queryFn: () => fetch(API_URL + `/user/id/${id}`).then((res) => res.json()),
    });
};
