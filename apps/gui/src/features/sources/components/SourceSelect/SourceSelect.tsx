import { forwardRef } from "react";

import BaseSelect, { type BaseSelectProps } from "~/components/BaseSelect";
import trpc from "~/utils/trpc";

interface SourceSelectProps extends Omit<BaseSelectProps, "data"> {}

const SourceSelect = forwardRef<HTMLButtonElement, SourceSelectProps>(
    (props, ref) => {
        const { data, isLoading, isError } = trpc.source.getAll.useQuery({});

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
