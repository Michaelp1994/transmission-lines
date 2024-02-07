import type { GenerateTowersInput } from "@repo/validators/schemas/GenerateTowers.schema";
import type { TransmissionTowerInput } from "@repo/validators/schemas/TransmissionTower.schema";

export default function generateTowers(
    values: GenerateTowersInput
): TransmissionTowerInput[] {
    const avgDistance = values.distance / values.numTowers;
    const newTowers: TransmissionTowerInput[] = Array(values.numTowers)
        .fill(0)
        .map((_, index) => ({
            name: values.namePrefix + (index + 1),
            resistance: values.resistance,
            distance: avgDistance,
            geometryId: values.geometryId,
        }));
    return newTowers;
}
