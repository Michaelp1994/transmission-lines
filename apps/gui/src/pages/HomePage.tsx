import { styled } from "@linaria/react";
import { Button } from "@repo/ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const Home: React.FC<Props> = () => {
    const navigate = useNavigate();
    const openProjectMutation = trpc.files.openProject.useMutation();

    const { t } = useTranslation("home");
    async function handleOpen() {
        try {
            const data = await openProjectMutation.mutateAsync();
            if (!data) return; // The user closed the open file dialog
            navigate(ROUTES.PROJECT.path);
        } catch (e) {
            console.log(e);
            toast.error("There is an error in your file");
        }
    }

    return (
        <Wrapper>
            <Button onClick={handleOpen}>{t("openProject")}</Button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    gap: 12px;
`;

export default Home;
