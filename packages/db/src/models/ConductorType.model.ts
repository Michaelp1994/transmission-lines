import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const nullable = true;

@Entity()
export default class ConductorType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * name of Conductor Type
     *
     */
    @Column()
    name: string;

    /**
     * Surface area in mm^2
     *
     */
    @Column("real", { nullable })
    surfaceArea?: number;

    @Column("real", { nullable })
    stranding?: string;

    /**
     * Outer diameter in mm
     *
     */
    @Column("real", { nullable })
    outerDiameter: number;

    /**
     * inner core diameter in mm
     *
     */
    @Column("real", { nullable })
    coreDiameter?: number;

    /**
     * number of layers
     *
     */

    @Column("real", { nullable })
    layers?: number;

    /**
     * current carrying capacity in Amps
     *
     */

    @Column("real", { nullable })
    currentCapacity?: number;

    /**
     * DC Resistance per km at 25 degrees
     *
     */
    @Column("real", { nullable })
    dcResistance25?: number;

    /**
     * AC Resistance per km at 25 degrees
     *
     */
    @Column("real", { nullable })
    acResistance25?: number;

    /**
     * AC Resistance per km at 50 degrees
     *
     */

    @Column("real", { nullable })
    acResistance50?: number;

    /**
     * AC Resistance per km at 75 degrees
     *
     */

    @Column("real", { nullable })
    acResistance75: number;

    /**
     * GMR (Geometric mean radius) in mm
     *
     */

    @Column("real", { nullable })
    gmr: number;
}
