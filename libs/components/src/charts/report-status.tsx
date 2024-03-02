import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Sector,
    Cell,
} from "recharts";
import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import dayjs from "dayjs";

export const useGetPieChartResponseStatus = () => {
    return useQuery({
        queryKey: ["useGetPieChartResponseStatus"],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/report/pie-chart-status`,
                method: "GET",
            }).then((res) => res.data),
    });
};

enum Local_EnumResponseStatus {
    NOT_RESPONDED = "notResponded",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    COMPLETED = "completed",
}

const statusColors = {
    "Not Responded": "#FFD700", // Gold
    "Accepted": "#00FF00", // Green
    "Rejected": "#FF0000", // Red
    "Completed": "#0000FF", // Blue
};

export interface InterfacePieChartReportStatus {
    name: string;
    total: number;
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, name } =
        props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${name}`}</text>
        </g>
    );
};
export function PieChartReportStatus() {
    const { data: chartData, isLoading } = useGetPieChartResponseStatus();
    const [activeIndex, setActiveIndex] = React.useState(0);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    const sanitalizeNameWithEnum = (name: string) => {
        switch (name) {
            case Local_EnumResponseStatus.NOT_RESPONDED:
                return "Not Responded";
            case Local_EnumResponseStatus.ACCEPTED:
                return "Accepted";
            case Local_EnumResponseStatus.REJECTED:
                return "Rejected";
            case Local_EnumResponseStatus.COMPLETED:
                return "Completed";
            default:
                return name;
        }
    };

    const appendToData = (data: InterfacePieChartReportStatus[]) => {
        return data.map((d) => {
            return {
                ...d,
                name: sanitalizeNameWithEnum(d.name),
            };
        });
    };

    chartData.data = appendToData(chartData.data);

    console.log("chartData", chartData.data);

    return (
        <ResponsiveContainer width="100%" height={600}>
            <PieChart
                width={500}
                height={400}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <Legend layout="horizontal" verticalAlign="top" align="center" />
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={onPieEnter}
                    label
                    data={chartData.data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                >
                    {chartData.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={statusColors[entry.name]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
