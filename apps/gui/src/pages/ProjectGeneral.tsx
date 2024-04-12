import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@repo/ui";
import {
    UpdateTowerGeometryInput,
    updateTowerGeometrySchema,
} from "@repo/validators";
import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { toast } from "sonner";

import UpdateProjectForm from "@/features/projects/components/UpdateProjectForm";
import routes from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const ProjectGeneral: React.FC<Props> = () => {
    const { t } = useTranslation("projects");
    const { projectId } = useTypedParams(routes.projects.View);
    const { data, error, isLoading } = trpc.project.getById.useQuery({
        id: projectId,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>General Info</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <UpdateProjectForm data={data} />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default ProjectGeneral;
