import { styled } from "@linaria/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    CardHeader,
    Card,
    CardContent,
    CardHeaderText,
    CardTitle,
    Button,
    TableCaption,
} from "@repo/ui";

import ROUTES from "@/router/routes";
import { ChevronRight } from "lucide-react";
import trpc from "@/utils/trpc";

interface Props {}

const GenerateResults: React.FC<Props> = () => {
    const { t } = useTranslation("worstCaseResults");

    const saveScriptMutation = trpc.saveScript.useMutation();

    const worstCaseScenario = trpc.worstCaseScenario.useMutation();

    useEffect(() => {
        async function callMutation() {
            await worstCaseScenario.mutateAsync();
        }
        callMutation();
    }, []);

    async function handleSaveScript() {
        await saveScriptMutation.mutateAsync();
    }

    return (
        <Wrapper>
            <Link to={ROUTES.PROJECT.path}>{t("general:goBack")}</Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <TableWrapper>
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
                                            <TableCell></TableCell>

                                            <StyledTableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                    {/* <Link
                                                    to={ROUTES.TRANSMISSION_FAULT.buildPath(
                                                        {
                                                            id: source.id,
                                                        }
                                                    )}
                                                > */}
                                                    <ChevronRight />
                                                    {/* </Link> */}
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
                    </TableWrapper>
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

export default GenerateResults;
