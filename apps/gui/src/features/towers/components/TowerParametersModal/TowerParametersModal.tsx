import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@repo/ui";
import { TowerID } from "@repo/validators/schemas/Ids.schema";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

export interface TowerParametersModalProps {
    towerId: TowerID;
    onClose: () => void;
}

export default function TowerParametersModal({
    onClose,
    towerId,
}: TowerParametersModalProps) {
    const { t } = useTranslation("towerParametersModal");
    const { data } = trpc.tower.getParameters.useQuery({
        towerId,
    });

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay />

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("modalTitle")}</DialogTitle>
                        <DialogDescription>
                            {t("modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="rmatrix">
                        <TabsList>
                            <TabsTrigger value="rmatrix">R-Matrix</TabsTrigger>
                            <TabsTrigger value="xmatrix">X Matrix</TabsTrigger>
                            <TabsTrigger value="cmatrix">C Matrix</TabsTrigger>
                        </TabsList>
                        <TabsContent value="rmatrix">
                            {data?.rMatrix.toString()}
                        </TabsContent>
                        <TabsContent value="xmatrix">
                            {data?.xMatrix.toString()}
                        </TabsContent>
                        <TabsContent value="cmatrix">
                            {data?.cMatrix.toString()}
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
