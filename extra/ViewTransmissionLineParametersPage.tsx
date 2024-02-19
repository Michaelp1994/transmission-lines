import { styled } from "@linaria/react";
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
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const ViewTransmissionLineParametersPage: React.FC<Props> = () => {
    const { t } = useTranslation("transmissionLine");
    const { projectId, lineId } = useTypedParams(
        ROUTES.VIEW_TRANSMISSION_LINE_PARAMETERS
    );

    const { data, isError, isLoading } =
        trpc.transmissionLine.getParameters.useQuery({
            id: lineId,
        });

    if (isError) {
        return <div>Error!</div>;
    }
    if (isLoading) {
        return <div>Loading!</div>;
    }

    return (
        <Wrapper>
            <Link to={ROUTES.VIEW_PROJECT.buildPath({ projectId })}>
                {t("general:goBack")}
            </Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>
                            Transmission Line Parameters
                            {/* {t("build.title", {
                                lineName: transmissionLine.name,
                            })} */}
                        </CardTitle>
                        <CardDescription />
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <Title>{t("build.rMatrix.title")}</Title>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {data.rMatrix.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((col, colIndex) => (
                                            <TableCell key={colIndex}>
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
                                {data.xMatrix.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((col, colIndex) => (
                                            <TableCell key={colIndex}>
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
                                    {data.cMatrix.map((_, index) => (
                                        <TableHead>{index + 1}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.cMatrix.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell>{rowIndex + 1}</TableCell>
                                        {row.map((col, colIndex) => (
                                            <TableCell key={colIndex}>
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
export default ViewTransmissionLineParametersPage;
