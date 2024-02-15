import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import type { Relation } from "typeorm";

// eslint-disable-next-line import/no-cycle
import Source from "./Source.model";
// eslint-disable-next-line import/no-cycle
import TransmissionLine from "./TransmissionLine.model";

@Entity()
export default class Project extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(
        () => TransmissionLine,
        (transmissionLine) => transmissionLine.project,
        {
            cascade: ["insert", "update"],
        }
    )
    transmissionLines: Relation<TransmissionLine[]>;

    @OneToMany(() => Source, (source) => source.project, {
        cascade: ["insert", "update"],
    })
    sources: Relation<Source[]>;
}
