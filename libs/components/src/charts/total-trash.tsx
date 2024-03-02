import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import dayjs from "dayjs";

export const useGetAreaChartTrashTotal = () => {
    return useQuery({
        queryKey: ["useGetAreaChartTrashTotal"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/trash/area-chart-total`,
                method: "GET",
            }).then((res) => res.data),
    });
};

export interface InterfaceAreaChartTrashTotal {
    name: string;
    total: number;
}

export function AreaChartTotalTrash() {
    const { data: chartData, isLoading } = useGetAreaChartTrashTotal();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ResponsiveContainer className="p-2 m-0" width="100%" height={200}>
            <AreaChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis fontSize={12} dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
