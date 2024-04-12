import { styled } from "@linaria/react";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ProjectTable from "@/features/projects/components/ProjectTable";
import routes from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const AllProjectsPage: React.FC<Props> = () => {
    const navigate = useNavigate();
    const openProjectMutation = trpc.project.import.useMutation();
    const { t } = useTranslation("home");
    async function importProject() {
        try {
            const data = await openProjectMutation.mutateAsync();
            if (!data) return; // The user closed the open file dialog
            navigate(routes.projects.View.buildPath({ projectId: data.id }));
        } catch (e) {
            console.log(e);
            toast.error("There is an error in your file");
        }
    }

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>All Projects</CardTitle>
                        <CardDescription>
                            Select a project to begin
                        </CardDescription>
                    </CardHeaderText>
                    <CardHeaderActions>
                        <Button onClick={() => importProject()}>
                            Import Project
                        </Button>
                        <Button asChild>
                            <Link to={routes.projects.Create.path}>
                                New Project
                            </Link>
                        </Button>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <ProjectTable />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default AllProjectsPage;
