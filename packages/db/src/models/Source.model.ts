import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Source extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    phases: number;

    @Column()
    voltage: number;

    @Column()
    x1r1: number;

    @Column()
    x0r0: number;

    @Column()
    isc3: number;

    @Column()
    isc1: number;

    @Column()
    resistance: number;

    @Column()
    frequency: number;
}
