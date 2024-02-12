import React, { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

interface APIBoundaryProps {
    children: ReactNode;
}

const APIBoundary: React.FC<APIBoundaryProps> = ({ children }) => {
    const { isLoading, error } = useQuery({
        queryKey: ["apiPingStatus"],
        queryFn: () => fetch(API_URL + `/ping`).then((res) => res.json()),
        refetchInterval: 60000,
    });

    return (
        <div>
            {error && <p className="error">Connection failed</p>}
            {!isLoading && children}
        </div>
    );
};

export default APIBoundary;
