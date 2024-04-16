import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";

interface PageNotFoundProps {}

const PageNotFound: React.FC<PageNotFoundProps> = () => {
    const { t } = useTranslation("pageNotFound");

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <div>{t("text")}</div>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default PageNotFound;
