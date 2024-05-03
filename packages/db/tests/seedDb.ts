import fs from "fs/promises";
import { faker } from "@faker-js/faker";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import databaseInit from "../src";
import {
    conductorLocations,
    conductorTypes,
    projects,
    sources,
    towerGeometries,
    transmissionConductors,
    transmissionLines,
    transmissionTowers,
} from "../src/schemas";
import {
    createMockProject,
    createMockSource,
    createMockTransmissionConductor,
    createMockTransmissionLine,
    createMockTransmissionTower,
} from "./mockData";
import mockConductorTypes from "./seeds/conductorTypes.json";
import mockGeometries from "./seeds/geometries.json";

const DB_LOCATION = "./test.db";
const MAX_PROJECTS = 10;
const MAX_SOURCES = 10; // Per Project
const MAX_TRANSMISSION_LINES = 10; // Per Project

await fs.unlink(DB_LOCATION);

const { db } = databaseInit(DB_LOCATION);

migrate(db, { migrationsFolder: "./src/migrations" });

const allConductorTypes = await db
    .insert(conductorTypes)
    .values(mockConductorTypes)
    .returning();

const conductorIds = allConductorTypes.map((conductor) => conductor.id);

const allGeometries = [];

for await (const mockGeometry of mockGeometries) {
    const [geometry] = await db
        .insert(towerGeometries)
        .values(mockGeometry)
        .returning();

    if (!geometry) {
        console.log(mockGeometry);
        throw new Error("can't add geometry");
    }
    const mockConductorLocations = mockGeometry.conductors.map((conductor) => {
        return {
            ...conductor,
            geometryId: geometry.id,
        };
    });

    await db.insert(conductorLocations).values(mockConductorLocations);
    allGeometries.push(geometry);
}

const geometryIds = allGeometries.map((geometry) => geometry.id);

const numProjects = faker.number.int({ min: 5, max: MAX_PROJECTS });

for (let i = 0; i < numProjects; i = i + 1) {
    const mockProject = createMockProject();
    const [project] = await db.insert(projects).values(mockProject).returning();

    if (!project) {
        console.log(mockProject);
        throw new Error("can't add project");
    }

    const projectId = project.id;
    const numSources = faker.number.int({ min: 3, max: MAX_SOURCES });
    const mockSources = Array.from({ length: numSources }, () =>
        createMockSource(projectId)
    );

    const allSources = await db.insert(sources).values(mockSources).returning();
    const sourceIds = allSources.map((source) => source.id);
    const numTransmissionLines = faker.number.int({
        min: 3,
        max: MAX_TRANSMISSION_LINES,
    });

    for (let j = 0; j < numTransmissionLines; j = j + 1) {
        const mockTransmissionLine = createMockTransmissionLine(
            projectId,
            sourceIds
        );

        const [transmissionLine] = await db
            .insert(transmissionLines)
            .values(mockTransmissionLine)
            .returning();

        if (!transmissionLine) {
            console.log(mockTransmissionLine);
            throw new Error("can't add transmission line");
        }

        const lineId = transmissionLine.id;

        const numConductors = faker.number.int({ min: 1, max: 10 });

        const mockConductors = Array.from({ length: numConductors }, () =>
            createMockTransmissionConductor(lineId, conductorIds)
        );

        await db
            .insert(transmissionConductors)
            .values(mockConductors)
            .returning();

        const numTowers = faker.number.int({ min: 1, max: 50 });

        const mockTowers = Array.from({ length: numTowers }, () =>
            createMockTransmissionTower(lineId, geometryIds)
        );

        await db.insert(transmissionTowers).values(mockTowers).returning();
    }
}

console.log("database seeded");
