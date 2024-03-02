import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Sector } from "recharts";
import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import dayjs from "dayjs";

export const useGetAreaChartReportTotal = () => {
    return useQuery({
        queryKey: ["useGetAreaChartReportTotal"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/report/area-chart-total`,
                method: "GET",
            }).then((res) => res.data),
    });
};

export interface InterfaceAreaChartReportTotal {
    name: string;
    total: number;
}

export function AreaChartTotalReport() {
    const { data: chartData, isLoading } = useGetAreaChartReportTotal();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ResponsiveContainer className="p-2 m-0" width="100%" height={200}>
            <AreaChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis fontSize={10} dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
