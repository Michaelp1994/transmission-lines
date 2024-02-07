import { styled } from "@linaria/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import {
    Card,
    CardContent,
    CardDescription,
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

import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const BuildTransmissionLine: React.FC<Props> = () => {
    const { t } = useTranslation("transmissionLine");
    const { id } = useTypedParams(ROUTES.BUILD_TRANSMISSION_LINE);

    const { mutateAsync, data } = trpc.buildTransmissionLine.useMutation();
    const {
        data: transmissionLine,
        isLoading,
        isError,
    } = trpc.getTransmissionLineById.useQuery(id);

    useEffect(() => {
        async function callMutation() {
            await mutateAsync(id);
        }
        callMutation();
    }, []);
    if (isError) {
        return <div>Error!</div>;
    }
    if (isLoading) {
        return <div>Loading!</div>;
    }

    return (
        <Wrapper>
            <Link to={ROUTES.PROJECT.path}>{t("general:goBack")}</Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>
                            {t("build.title", {
                                lineName: transmissionLine.name,
                            })}
                        </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <Title>{t("build.rMatrix.title")}</Title>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {data?.rMatrix.map((row, index) => (
                                    <TableRow key={index}>
                                        {row.map((col, index2) => (
                                            <TableCell key={index2}>
                                                {col}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Title>{t("build.xMatrix.title")}</Title>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {data?.xMatrix.map((row, index) => (
                                    <TableRow key={index}>
                                        {row.map((col, index2) => (
                                            <TableCell key={index2}>
                                                {col}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Title>{t("build.cMatrix.title")}</Title>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead> </TableHead>
                                    {data?.cMatrix.map((_, index) => (
                                        <TableHead>{index + 1}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.cMatrix.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        {row.map((col, index2) => (
                                            <TableCell key={index2}>
                                                {col}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding-bottom: 100px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-top: 1rem;
`;
const TableContainer = styled.div`
    max-width: 100%;
    overflow-y: auto;
`;
export default BuildTransmissionLine;
