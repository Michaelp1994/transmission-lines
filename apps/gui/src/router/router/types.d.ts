declare module "react-router-dom" {
    interface RouteObject {
        handle?: {
            crumb?: (params: Record<string, string>) => {
                link: string;
                text: string;
            };
        };
    }
}
