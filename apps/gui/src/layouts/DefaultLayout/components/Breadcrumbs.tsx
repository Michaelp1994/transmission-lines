import { styled } from "@linaria/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@repo/ui";
import React from "react";
import { Link, useMatches } from "react-router-dom";

interface Props {}

const Breadcrumbs: React.FC<Props> = () => {
    const matches = useMatches();
    const crumbs = matches
        // first get rid of any matches that don't have handle and crumb
        .filter((match) => Boolean(match.handle?.crumb))
        // now map them into an array of elements, passing the loader
        // data to each one
        .map((match) => match.handle.crumb(match.params));
    return (
        <Wrapper>
            <Breadcrumb>
                <BreadcrumbList>
                    {crumbs.map((crumb, index) => {
                        if (index === crumbs.length - 1) {
                            return (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbPage>
                                        {crumb.text}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            );
                        }
                        return (
                            <>
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink asChild>
                                        <Link to={crumb.link}>
                                            {crumb.text}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-bottom: 2rem;
`;
export default Breadcrumbs;
