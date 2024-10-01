export interface TransmissionConductor {
    id: string;
    name: string;
    fromPhase: number;
    toPhase: number;
    bundleNumber: number;
    bundleSpacing: number;
    isNeutral: boolean;
    typeId: string;
    lineId: string;
}
