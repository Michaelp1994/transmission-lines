import { styled } from "@linaria/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trash2, Info, Brackets } from "lucide-react";

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

interface Props {}

const TransmissionLinesList: React.FC<Props> = () => {
    const utils = trpc.useUtils();
    const { t } = useTranslation("transmissionLine");

    const { data } = trpc.transmissionLine.getAll.useQuery();
    const deleteTransmissionLineMutation =
        trpc.transmissionLine.delete.useMutation({
            onSuccess(input) {
                utils.transmissionLine.getAll.invalidate();
                utils.transmissionLine.getById.invalidate(input);
            },
        });

    async function removeLine(id: string) {
        await deleteTransmissionLineMutation.mutateAsync(id);
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
                        <Button variant="ghost" asChild>
                            <Link
                                to={ROUTES.BUILD_TRANSMISSION_LINE.buildPath({
                                    id,
                                })}
                            >
                                <BracketsIcon />
                            </Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link
                                to={ROUTES.UPDATE_TRANSMISSION_LINE.buildPath({
                                    id,
                                })}
                            >
                                <InfoIcon />
                            </Link>
                        </Button>
                        <ConfirmDialog onConfirm={() => removeLine(id)} />
                    </ItemActions>
                </ListItem>
            ))}
        </>
    );
};

const BracketsIcon = styled(Brackets)`
    height: 24px;
    width: 24px;
`;

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

export default TransmissionLinesList;
