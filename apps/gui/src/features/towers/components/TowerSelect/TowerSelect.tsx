import { forwardRef } from "react";

import BaseSelect, { type BaseSelectProps } from "~/components/BaseSelect";
import trpc from "~/utils/trpc";

interface TowerSelectProps extends Omit<BaseSelectProps, "data"> {}

const TowerSelect = forwardRef<HTMLButtonElement, TowerSelectProps>(
    (props, ref) => {
        const { data, isLoading, isError } = trpc.tower.getAll.useQuery();

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (isError || !data) {
            return <div>Error!</div>;
        }

        return <BaseSelect data={data} ref={ref} {...props} />;
    }
);

TowerSelect.displayName = "TowerSelect";

export default TowerSelect;
