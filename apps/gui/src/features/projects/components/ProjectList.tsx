import { styled } from "@linaria/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    buttonVariants,
} from "@repo/ui";
import { Info, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
    ItemActions,
    ListHeader,
    ListItem,
    ListItemLeftSide,
    ListItemText,
    ListItemTitle,
} from "@/components/List";
import routes from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const ProjectList: React.FC<Props> = () => {
    const utils = trpc.useUtils();
    const { t } = useTranslation("transmissionLine");

    const { data } = trpc.project.getAll.useQuery();
    const deleteProjectMutation = trpc.project.delete.useMutation({
        onSuccess(input) {
            utils.project.getAll.invalidate();
            utils.project.getById.invalidate(input);
        },
    });

    async function removeProject(id: string) {
        await deleteProjectMutation.mutateAsync({ id });
    }

    return (
        <>
            <ListHeader>Projects</ListHeader>
            {data?.map(({ id, name }) => (
                <ListItem key={id}>
                    <ListItemLeftSide>
                        <ListItemText>
                            <ListItemTitle>{name}</ListItemTitle>
                        </ListItemText>
                    </ListItemLeftSide>
                    <ItemActions>
                        <Button variant="ghost" asChild>
                            <Link
                                to={routes.projects.View.buildPath({
                                    projectId: id,
                                })}
                            >
                                <InfoIcon />
                            </Link>
                        </Button>
                        <ConfirmDialog onConfirm={() => removeProject(id)} />
                    </ItemActions>
                </ListItem>
            ))}
        </>
    );
};

const InfoIcon = styled(Info)`
    height: 24px;
    width: 24px;
`;

interface ConfirmDialogProps {
    onConfirm(): void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirm }) => {
    const { t } = useTranslation("transmissionLine");

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <CloseIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t("general:confirmationTitle")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("general:cannotUndo")}
                        <br />
                        {t("deletionWarning")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("form:cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={() => onConfirm()}
                    >
                        {t("form:delete")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const CloseIcon = styled(Trash2)`
    height: 24px;
    width: 24px;
`;

export default ProjectList;
