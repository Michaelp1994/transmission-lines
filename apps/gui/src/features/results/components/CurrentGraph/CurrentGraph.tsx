import { styled } from "@linaria/react";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    CartesianGrid,
    Label,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { ContentType } from "recharts/types/component/Tooltip";

interface Props {
    data: any;
}

const CurrentGraph: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation("singleFault");

    return (
        <GraphContainer>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name">
                        <Label
                            value={t("location.title")}
                            offset={0}
                            position="insideBottom"
                        />
                    </XAxis>
                    <YAxis>
                        <Label
                            value={t("current.title")}
                            angle={-90}
                            offset={0}
                            position="insideLeft"
                            textAnchor="middle"
                        />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="current" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </GraphContainer>
    );
};

const GraphContainer = styled.div`
    margin-top: 4rem;
    margin-bottom: 4rem;
`;

const CustomTooltip: ContentType<number, string> = ({
    active,
    payload,
    label,
}) => {
    const { t } = useTranslation("singleFault");
    if (active && payload && payload.length) {
        return (
            <TooltipWrapper>
                <p>{t("location.tooltipLabel", { name: label })}</p>
                <p>
                    {t("current.tooltipLabel", {
                        current: payload[0].payload.current.toFixed(2),
                    })}
                </p>
                <p>
                    {t("resistance.tooltipLabel", {
                        resistance: payload[0].payload.resistance,
                    })}
                </p>
            </TooltipWrapper>
        );
    }

    return null;
};

const TooltipWrapper = styled.div`
    margin: 0;
    padding: 10px;
    background-color: rgb(255 255 255);
    border: 1px solid rgb(204 204 204);
    white-space: nowrap;
`;

export default CurrentGraph;
