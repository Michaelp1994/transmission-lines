import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@repo/ui";
import { Link, useMatches } from "@tanstack/react-router";
import React from "react";

export default function Breadcrumbs() {
    const routes = useMatches();
    const filteredRoutes = routes.filter((route) => route.routeContext.text);
    const crumbs = filteredRoutes.map((match) => {
        return {
            text: match.routeContext.text,
            link: match.pathname,
        };
    });

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, index) => {
                    if (index === crumbs.length - 1) {
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbPage>{crumb.text}</BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={crumb.link}>{crumb.text}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
