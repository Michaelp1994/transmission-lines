import { zodResolver } from "@hookform/resolvers/zod";
import {
    ConductorFormInput,
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

export const useCreateProjectForm = () =>
    useForm<ProjectFormInput>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: defaultProject,
    });

export const useCreateConductorLocationForm = () =>
    useForm<ConductorLocationFormInput>({
        resolver: zodResolver(conductorLocationFormSchema),
        defaultValues: defaultConductorLocation,
    });

export const useUpdateConductorLocationForm = (
    data: ConductorLocationFormInput
) =>
    useForm<ConductorLocationFormInput>({
        resolver: zodResolver(conductorLocationFormSchema),
        values: data,
    });

export const useCreateConductorForm = () =>
    useForm<ConductorFormInput>({
        resolver: zodResolver(conductorFormSchema),
        values: defaultConductor,
    });

export const useGenerateConductorsForm = () =>
    useForm<GenerateConductorsFormInput>({
        resolver: zodResolver(generateConductorsFormSchema),
        values: defaultGenerateFormConductors,
    });

export const useUpdateConductorForm = (data: ConductorFormInput) =>
    useForm<ConductorFormInput>({
        resolver: zodResolver(conductorFormSchema),
        values: data,
    });
export const useCreateConductorTypeForm = () =>
    useForm<ConductorTypeFormInput>({
        resolver: zodResolver(conductorTypeFormSchema),
        defaultValues: defaultConductorType,
    });

export const useUpdateConductorTypeForm = (data: ConductorTypeFormInput) =>
    useForm<ConductorTypeFormInput>({
        resolver: zodResolver(conductorTypeFormSchema),
        values: data,
    });

export const useUpdateTowerGeometryForm = (data: TowerGeometryFormInput) =>
    useForm<TowerGeometryFormInput>({
        resolver: zodResolver(towerGeometryFormSchema),
        values: data,
    });

export const useCreateSourceForm = () =>
    useForm<SourceFormInput>({
        resolver: zodResolver(sourceFormSchema),
        values: defaultSource,
    });

export const useUpdateSourceElectricalForm = (
    data: UpdateSourceElectricalFormInput
) =>
    useForm<UpdateSourceElectricalFormInput>({
        resolver: zodResolver(updateSourceElectricalFormSchema),
        values: data,
    });

export const useUpdateSourceGeneralForm = (
    data: UpdateSourceGeneralFormInput
) =>
    useForm<UpdateSourceGeneralFormInput>({
        resolver: zodResolver(updateSourceGeneralFormSchema),
        values: data,
    });

export const useCreateTowerGeometryForm = () =>
    useForm<TowerGeometryFormInput>({
        resolver: zodResolver(towerGeometryFormSchema),
        defaultValues: defaultTowerGeometry,
    });

export const useCreateTransmissionTowerForm = () =>
    useForm<TransmissionTowerFormInput>({
        resolver: zodResolver(transmissionTowerFormSchema),
        values: defaultTransmissionTower,
    });

export const useGenerateTowersForm = () =>
    useForm<GenerateTowersFormInput>({
        resolver: zodResolver(generateTowersFormSchema),
        values: defaultGenerateTowers,
    });

export const useUpdateTransmissionTowerForm = (
    data: TransmissionTowerFormInput
) =>
    useForm<TransmissionTowerFormInput>({
        resolver: zodResolver(transmissionTowerFormSchema),
        values: data,
    });

export const useCreateTransmissionLineForm = () =>
    useForm<TransmissionLineFormInput>({
        resolver: zodResolver(transmissionLineFormSchema),
        values: defaultTransmissionLine,
    });

export const useUpdateTransmissionLineForm = (
    data: TransmissionLineFormInput
) =>
    useForm<TransmissionLineFormInput>({
        resolver: zodResolver(transmissionLineFormSchema),
        values: data,
    });
