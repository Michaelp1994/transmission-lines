import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Info, Trash2 } from "lucide-react";
import { styled } from "@linaria/react";

import {
    Button,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    buttonVariants,
} from "@repo/ui";

import ROUTES from "@/router/routes";
import {
    ItemActions,
    ListItem,
    ListHeader,
    ListItemLeftSide,
    ListItemText,
    ListItemTitle,
} from "@/components/List";
import trpc from "@/utils/trpc";

interface Props {}

const SourcesList: React.FC<Props> = () => {
    const utils = trpc.useUtils();
    const { data, error, isLoading } = trpc.source.getAll.useQuery();
    const deleteSourceMutation = trpc.source.delete.useMutation({
        onSuccess(input) {
            utils.source.getAll.invalidate();
            utils.source.getById.invalidate(input);
        },
    });
    const { t } = useTranslation("source");

    async function remove(id: string) {
        await deleteSourceMutation.mutateAsync(id);
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
                                    id,
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
