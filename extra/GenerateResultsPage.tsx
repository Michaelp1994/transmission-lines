import { styled } from "@linaria/react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const GenerateResultsPage: React.FC<Props> = () => {
    const { t } = useTranslation("worstCaseResults");
    const { projectId } = useTypedParams(ROUTES.GENERATE_RESULTS);
    // const saveScriptMutation = trpc.saveScript.useMutation();

    const worstCaseScenario = trpc.project.solve.useQuery(
        { id: projectId },
        {
            retry: false,
        }
    );

    async function handleSaveScript() {
        // await saveScriptMutation.mutateAsync();
    }

    return (
        <Wrapper>
            <Link to={ROUTES.VIEW_PROJECT.buildPath({ projectId })}>
                {t("general:goBack")}
            </Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    {/*     <TableWrapper>
                        <Table>
                            <TableCaption>Sources</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t("location.title")}</TableHead>
                                    <TableHead>{t("current.title")}</TableHead>
                                    <TableHead> </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {worstCaseScenario.data?.sources.map(
                                    (source) => (
                                        <TableRow key={source.id}>
                                            <TableCell>{source.name}</TableCell>
                                            <TableCell>
                                                {source.current.toFixed(2)}
                                            </TableCell>
                                            <TableCell />

                                            <StyledTableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                     <Link
                                                    to={ROUTES.TRANSMISSION_FAULT.buildPath(
                                                        {
                                                            id: source.id,
                                                        }
                                                    )}
                                                > 
                                                    <ChevronRight />
                                                     </Link>
                                                </Button>
                                            </StyledTableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                    <TableWrapper>
                        {worstCaseScenario.data?.transmissionLines.map(
                            (transmissionLine) => (
                                <Table>
                                    <TableCaption>
                                        Transmission line:{" "}
                                        {transmissionLine.name}
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tower</TableHead>
                                            <TableHead>
                                                {t("current.title")}
                                            </TableHead>
                                            <TableHead> </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transmissionLine.towers.map(
                                            (tower) => (
                                                <TableRow key={tower.id}>
                                                    <TableCell>
                                                        {tower.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {tower.current.toFixed(
                                                            2
                                                        )}
                                                    </TableCell>
                                                    <StyledTableCell>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            asChild
                                                        >
                                                            <Link
                                                                to={ROUTES.TRANSMISSION_FAULT.buildPath(
                                                                    {
                                                                        lineId: transmissionLine.id,
                                                                        towerId:
                                                                            tower.id,
                                                                    }
                                                                )}
                                                            >
                                                                <ChevronRight />
                                                            </Link>
                                                        </Button>
                                                    </StyledTableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            )
                        )}
                    </TableWrapper> */}
                    <Button onClick={handleSaveScript}>Save Script</Button>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const StyledTableCell = styled(TableCell)`
    width: 2.5rem;
`;
const TableWrapper = styled.div`
    border-radius: 0.375rem;
    border-width: 1px;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export default GenerateResultsPage;
