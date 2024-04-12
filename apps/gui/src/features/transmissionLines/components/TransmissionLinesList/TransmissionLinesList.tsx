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
import { Brackets, Info, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ConfirmationDialog from "@/components/ConfirmationDialog";
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

interface Props {
    projectId: string;
}

const TransmissionLinesList: React.FC<Props> = ({ projectId }) => {
    const utils = trpc.useUtils();
    const { t } = useTranslation("transmissionLine");

    const { data } = trpc.transmissionLine.getAll.useQuery({ projectId });
    const deleteTransmissionLineMutation =
        trpc.transmissionLine.delete.useMutation({
            onSuccess(input) {
                utils.transmissionLine.getAll.invalidate();
                utils.transmissionLine.getById.invalidate(input);
            },
        });

    async function removeLine(id: string) {
        await deleteTransmissionLineMutation.mutateAsync({ id });
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
                                to={routes.projects.View.Lines.View.buildPath({
                                    projectId,
                                    lineId: id,
                                })}
                            >
                                <InfoIcon />
                            </Link>
                        </Button>
                        <ConfirmationDialog onConfirm={() => removeLine(id)} />
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

export default TransmissionLinesList;
