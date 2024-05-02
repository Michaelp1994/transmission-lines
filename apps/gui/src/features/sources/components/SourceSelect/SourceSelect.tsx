import type { ProjectID } from "@repo/validators/Ids";
import { forwardRef } from "react";
import BaseSelect, { type BaseSelectProps } from "~/components/BaseSelect";
import trpc from "~/utils/trpc";

interface DataWrapperProps extends Omit<BaseSelectProps, "data"> {
    projectId: ProjectID;
}

const DataWrapper = forwardRef<HTMLButtonElement, DataWrapperProps>(
    ({ projectId, ...props }, ref) => {
        const { data, isLoading, isError, error } =
            trpc.source.getAllByProjectId.useQuery({
                projectId,
            });

        if (isLoading) {return <div>Loading...</div>;}

        if (isError) {return <div>Error: {error.message}</div>;}

        return <BaseSelect data={data} ref={ref} {...props} />;
    }
);

export default DataWrapper;
