import type { GenerateTowersInput } from "@repo/validators/schemas/TransmissionTower.schema";

import { randomUUID } from "crypto";

export default function generateTowers(values: GenerateTowersInput) {
    const avgDistance = values.distance / values.numTowers;
    const newTowers = Array(values.numTowers)
        .fill(0)
        .map((_, index) => {
            return {
                id: randomUUID(),
                name: values.namePrefix + (index + 1),
                resistance: values.resistance,
                distance: avgDistance,
                geometryId: values.geometryId,
                lineId: values.lineId,
            };
        });

    return newTowers;
}
