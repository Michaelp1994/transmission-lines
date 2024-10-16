import type { ContentType } from "recharts/types/component/Tooltip";

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@repo/ui/chart";
import {
    CartesianGrid,
    Label,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import trpc from "~/utils/trpc";

export default function WorstCaseGraph() {
    const { data, isLoading, isError } = trpc.solution.getWorstCase.useQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error</div>;
    const chartConfig = {
        current: {
            label: "Current",

            color: "#8884d8",
        },
    } satisfies ChartConfig;
    const chartData = [
        {
            name: data.sourceCurrents[0].name,
            current: data.sourceCurrents[0].current.current.toFixed(2),
            angle: data.sourceCurrents[0].current.angle,
        },
        ...data.towerCurrents.map((tower) => ({
            name: tower.name,
            current: Number(tower.current.current.toFixed(2)),
            angle: tower.current.angle,
        })),
        {
            name: data.sourceCurrents[1].name,
            current: data.sourceCurrents[1].current.current.toFixed(2),
            angle: data.sourceCurrents[1].current.angle,
        },
    ];
    console.log(chartData);
    return (
        <ChartContainer className="min-h-[500px]" config={chartConfig}>
            <LineChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid />
                <XAxis dataKey="name">
                    <Label position="insideBottom" value="Location" />
                </XAxis>
                <YAxis>
                    <Label
                        angle={-90}
                        offset={0}
                        position="insideLeft"
                        textAnchor="middle"
                        value="Current (A)"
                    />
                </YAxis>
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                    dataKey="current"
                    stroke="#8884d8"
                    strokeWidth={2}
                    type="linear"
                />
            </LineChart>
        </ChartContainer>
    );
}

const CustomTooltip: ContentType<number, string> = ({
    active,
    payload,
    label,
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="m-0 p-2 bg-white border border-gray-200 whitespace-nowrap">
                <p>Name: {label}</p>
                <p>Current: {payload[0].payload.current.toFixed(2)} A</p>
                <p> Resistance: {payload[0].payload.resistance} Ω</p>
            </div>
        );
    }

    return null;
};
