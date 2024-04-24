import { ProjectID } from "@repo/validators/schemas/Ids.schema";
import { forwardRef } from "react";

import SourceSelect from "./SourceSelect";

import trpc from "~/utils/trpc";

interface DataWrapperProps {
    projectId: ProjectID;
}

const DataWrapper = forwardRef<HTMLButtonElement, DataWrapperProps>(
    ({ projectId, ...props }, ref) => {
        const { data, isLoading, isError, error } =
            trpc.source.getAllByProjectId.useQuery({
                projectId,
            });

        if (isLoading) return <div>Loading...</div>;

        if (isError) return <div>Error: {error.message}</div>;

        return <SourceSelect data={data} ref={ref} {...props} />;
    }
);

export default DataWrapper;
