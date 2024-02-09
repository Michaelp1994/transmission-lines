import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";


import CurrentGraph from "@/features/results/components/CurrentGraph/CurrentGraph";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";
// import CircuitDiagram from "@/features/results/components/CircuitDiagram";

interface Props {}

const TransmissionLineFault: React.FC<Props> = () => {
    const { t } = useTranslation("singleFault");
    const { lineId, towerId } = useTypedParams(ROUTES.TRANSMISSION_FAULT);

    const { data, isError, error, isLoading, refetch } =
        trpc.towerFault.useQuery(
            {
                location: {
                    transmissionLine: lineId,
                    tower: towerId,
                },
            },
            {
                enabled: false,
            }
        );

    useEffect(() => {
        refetch();
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }

    if (isError) {
        console.log(error);
        return <div>{t("general:errorMessage")}</div>;
    }

    const transmissionLine = data?.transmissionLines.find(
        (needle) => needle.id === lineId
    );

    const tower = transmissionLine?.towers.find(
        (needle) => needle.id === towerId
    );

    const fromSource = data?.sources.find(
        (needle) => needle.id === transmissionLine?.fromSource
    );

    const toSource =
        transmissionLine?.toSource &&
        data?.sources.find(
            (needle) => needle.id === transmissionLine?.toSource
        );

    if (!data || !transmissionLine || !fromSource || !tower) {
        console.log(data);
        console.log("transmission Line: ", transmissionLine);
        console.log("fromSource: ", fromSource);
        console.log("tower: ", tower);
        return <div>There is something wrong with the data</div>;
    }

    const chartData = [
        {
            name: fromSource.name,
            current: fromSource.groundCurrent,
            resistance: fromSource.resistance,
        },
        ...transmissionLine.towers.map((_tower) => ({
            name: _tower.name,
            current: _tower.groundCurrent,
            resistance: _tower.resistance,
        })),
    ];

    if (toSource) {
        chartData.push({
            name: toSource.name,
            current: toSource.groundCurrent,
            resistance: toSource.resistance,
        });
    }

    return (
        <Wrapper>
            <Link to={ROUTES.GENERATE_RESULTS.path}>{t("general:goBack")}</Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>
                            {t("title", {
                                lineName: transmissionLine.name,
                                towerName: tower.name,
                            })}
                        </CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <TableWrapper>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t("location.title")}</TableHead>
                                    <TableHead>{t("current.title")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow key={fromSource.id}>
                                    <TableCell>{fromSource.name}</TableCell>
                                    <TableCell>
                                        {fromSource.groundCurrent.toFixed(2)}
                                    </TableCell>
                                </TableRow>

                                {transmissionLine.towers.map((tower) => (
                                    <TableRow key={tower.id}>
                                        <TableCell>{tower.name}</TableCell>
                                        <TableCell>
                                            {tower.groundCurrent.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {toSource && (
                                    <TableRow key={toSource.id}>
                                        <TableCell>{toSource.name}</TableCell>
                                        <TableCell>
                                            {toSource.groundCurrent.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                    <Title>{t("graph.title")}</Title>
                    <CurrentGraph data={chartData} />
                    {/* <CircuitDiagram data={data} /> */}
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const TableWrapper = styled.div`
    border-radius: 0.375rem;
    border-width: 1px;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 24px;
    text-align: center;
`;

export default TransmissionLineFault;
