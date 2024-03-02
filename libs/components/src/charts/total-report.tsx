import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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

    // const appendDummyData = () => {
    //     const data = chartData.data;
    //     const today = dayjs(); // DD-M-YYYY
    //     const days = 30;
    //     const dummyData = [];
    //     for (let i = 0; i < days; i++) {
    //         const date = today.subtract(i, "day").format("DD-M-YYYY");
    //         if (!data.find((d) => d.name === date)) {
    //             dummyData.push({ name: date, total: Math.floor(Math.random() * 19) + 1 });
    //         }
    //     }
    //     return [...data, ...dummyData];
    // };

    // if (chartData.data.length < 30) {
    //     chartData.data = appendDummyData();
    // }

    return (
        <ResponsiveContainer width="100%" height={600}>
            <AreaChart
                width={500}
                height={400}
                data={chartData.data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
