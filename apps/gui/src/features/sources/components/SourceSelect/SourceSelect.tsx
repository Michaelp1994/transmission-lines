import type { ProjectID } from "@repo/validators/Ids";
import { forwardRef } from "react";
import BaseSelect, { type BaseSelectProps } from "~/components/BaseSelect";
import trpc from "~/utils/trpc";

interface DataWrapperProps extends Omit<BaseSelectProps, "data"> {
    projectId: ProjectID;
}

const SourceSelect = forwardRef<HTMLButtonElement, DataWrapperProps>(
    ({ projectId, ...props }, ref) => {
        const { data, isLoading, isError } =
            trpc.source.getAllByProjectId.useQuery({
                projectId,
            });

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (isError || !data) {
            return <div>Error!</div>;
        }

        return <BaseSelect data={data} ref={ref} {...props} />;
    }
);

SourceSelect.displayName = "SourceSelect";

export default SourceSelect;
