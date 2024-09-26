import { zodResolver } from "@hookform/resolvers/zod";
import {
    type ConductorFormInput,
    type ConductorLocationFormInput,
    type ConductorTypeFormInput,
    type GenerateConductorsFormInput,
    type GenerateTowersFormInput,
    type ProjectFormInput,
    type SourceFormInput,
    type TowerGeometryFormInput,
    type TransmissionLineFormInput,
    type TransmissionTowerFormInput,
    type UpdateSourceElectricalFormInput,
    type UpdateSourceGeneralFormInput,
    conductorFormSchema,
    conductorLocationFormSchema,
    conductorTypeFormSchema,
    defaultConductor,
    defaultConductorLocation,
    defaultConductorType,
    defaultGenerateFormConductors,
    defaultGenerateTowers,
    defaultProject,
    defaultSource,
    defaultTowerGeometry,
    defaultTransmissionLine,
    defaultTransmissionTower,
    generateConductorsFormSchema,
    generateTowersFormSchema,
    projectFormSchema,
    sourceFormSchema,
    towerGeometryFormSchema,
    transmissionLineFormSchema,
    transmissionTowerFormSchema,
    updateSourceElectricalFormSchema,
    updateSourceGeneralFormSchema,
} from "@repo/validators/forms";
import { useForm } from "react-hook-form";
export const useUpdateProjectForm = (data: ProjectFormInput) => {
    return useForm<ProjectFormInput>({
        resolver: zodResolver(projectFormSchema),
        values: data,
    });
};

export const useCreateConductorLocationForm = () => {
    return useForm<ConductorLocationFormInput>({
        resolver: zodResolver(conductorLocationFormSchema),
        defaultValues: defaultConductorLocation,
    });
};

export const useUpdateConductorLocationForm = (
    data: ConductorLocationFormInput
) => {
    return useForm<ConductorLocationFormInput>({
        resolver: zodResolver(conductorLocationFormSchema),
        values: data,
    });
};

export const useCreateConductorForm = () => {
    return useForm<ConductorFormInput>({
        resolver: zodResolver(conductorFormSchema),
        values: defaultConductor,
    });
};

export const useGenerateConductorsForm = () => {
    return useForm<GenerateConductorsFormInput>({
        resolver: zodResolver(generateConductorsFormSchema),
        values: defaultGenerateFormConductors,
    });
};

export const useUpdateConductorForm = (data: ConductorFormInput) => {
    return useForm<ConductorFormInput>({
        resolver: zodResolver(conductorFormSchema),
        values: data,
    });
};
export const useCreateConductorTypeForm = () => {
    return useForm<ConductorTypeFormInput>({
        resolver: zodResolver(conductorTypeFormSchema),
        defaultValues: defaultConductorType,
    });
};

export const useUpdateConductorTypeForm = (data: ConductorTypeFormInput) => {
    return useForm<ConductorTypeFormInput>({
        resolver: zodResolver(conductorTypeFormSchema),
        values: data,
    });
};

export const useUpdateTowerGeometryForm = (data: TowerGeometryFormInput) => {
    return useForm<TowerGeometryFormInput>({
        resolver: zodResolver(towerGeometryFormSchema),
        values: data,
    });
};

export const useCreateSourceForm = () => {
    return useForm<SourceFormInput>({
        resolver: zodResolver(sourceFormSchema),
        values: defaultSource,
    });
};

export const useUpdateSourceElectricalForm = (
    data: UpdateSourceElectricalFormInput
) => {
    return useForm<UpdateSourceElectricalFormInput>({
        resolver: zodResolver(updateSourceElectricalFormSchema),
        values: data,
    });
};

export const useUpdateSourceGeneralForm = (
    data: UpdateSourceGeneralFormInput
) => {
    return useForm<UpdateSourceGeneralFormInput>({
        resolver: zodResolver(updateSourceGeneralFormSchema),
        values: data,
    });
};

export const useCreateTowerGeometryForm = () => {
    return useForm<TowerGeometryFormInput>({
        resolver: zodResolver(towerGeometryFormSchema),
        defaultValues: defaultTowerGeometry,
    });
};

export const useCreateTransmissionTowerForm = () => {
    return useForm<TransmissionTowerFormInput>({
        resolver: zodResolver(transmissionTowerFormSchema),
        values: defaultTransmissionTower,
    });
};

export const useGenerateTowersForm = () => {
    return useForm<GenerateTowersFormInput>({
        resolver: zodResolver(generateTowersFormSchema),
        values: defaultGenerateTowers,
    });
};

export const useUpdateTransmissionTowerForm = (
    data: TransmissionTowerFormInput
) => {
    return useForm<TransmissionTowerFormInput>({
        resolver: zodResolver(transmissionTowerFormSchema),
        values: data,
    });
};

export const useCreateTransmissionLineForm = () => {
    return useForm<TransmissionLineFormInput>({
        resolver: zodResolver(transmissionLineFormSchema),
        values: defaultTransmissionLine,
    });
};

export const useUpdateTransmissionLineForm = (
    data: TransmissionLineFormInput
) => {
    return useForm<TransmissionLineFormInput>({
        resolver: zodResolver(transmissionLineFormSchema),
        values: data,
    });
};
