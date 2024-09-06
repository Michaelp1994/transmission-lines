import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CreateSourceForm } from "~/features/sources";

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/new"
)({
    component: CreateSourcePage,
    beforeLoad: () => {
        return {
            text: "New Source",
        };
    },
});

export default function CreateSourcePage() {
    const { t } = useTranslation("createSourceForm");
    const { projectId } = Route.useParams();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("add.title")}</CardTitle>
                <CardDescription>{t("add.description")}</CardDescription>
            </CardHeader>
            <CardContent>
                <CreateSourceForm projectId={projectId} />
            </CardContent>
        </Card>
    );
}
