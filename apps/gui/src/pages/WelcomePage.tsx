import { useTranslation } from "react-i18next";
import { styled } from "@linaria/react";

interface Props {}

const WelcomePage: React.FC<Props> = () => {
    const { t } = useTranslation("welcome");
    return <Wrapper>{t("title")}</Wrapper>;
};

const Wrapper = styled.div``;
export default WelcomePage;
