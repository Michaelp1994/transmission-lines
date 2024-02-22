import { z } from "zod";

import { openDssVSourceSchema } from "./vSource";

export const circuitSchema = openDssVSourceSchema.extend({});

export type OpenDSSCircuit = z.infer<typeof circuitSchema>;
