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
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {
    projectId: string;
}

const SourcesList: React.FC<Props> = ({ projectId }) => {
    const utils = trpc.useUtils();
    const { data, isError, error, isLoading } = trpc.source.getAll.useQuery({
        projectId,
    });
    const deleteSourceMutation = trpc.source.delete.useMutation({
        onSuccess(input) {
            utils.project.getById.invalidate({ id: projectId });
            utils.source.getAll.invalidate();
            utils.source.getById.invalidate(input);
        },
    });
    const { t } = useTranslation("source");

    async function remove(id: string) {
        await deleteSourceMutation.mutateAsync({ id });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        console.log(error);
        return <div>Error!</div>;
    }

    return (
        <>
            <ListHeader>{t("title")}</ListHeader>
            {data?.map(({ id, name }) => (
                <ListItem key={id}>
                    <ListItemLeftSide>
                        <ListItemText>
                            <ListItemTitle>{name}</ListItemTitle>
                        </ListItemText>
                    </ListItemLeftSide>

                    <ItemActions>
                        <Button asChild variant="ghost">
                            <Link
                                to={ROUTES.UPDATE_SOURCE.buildPath({
                                    projectId,
                                    sourceId: id,
                                })}
                            >
                                <InfoIcon />
                            </Link>
                        </Button>
                        <ConfirmDialog onConfirm={() => remove(id)} />
                    </ItemActions>
                </ListItem>
            ))}
        </>
    );
};

export const InfoIcon = styled(Info)`
    height: 24px;
    width: 24px;
`;

interface ConfirmDialogProps {
    onConfirm(): void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirm }) => {
    const { t } = useTranslation("source");

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

export const CloseIcon = styled(Trash2)`
    height: 24px;
    width: 24px;
`;

export default SourcesList;
