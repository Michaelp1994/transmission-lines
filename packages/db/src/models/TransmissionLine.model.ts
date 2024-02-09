import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from "typeorm";

// eslint-disable-next-line import/no-cycle
import TransmissionConductor from "./TransmissionConductor";
// eslint-disable-next-line import/no-cycle
import TransmissionTower from "./TransmissionTower.model";

@Entity()
export default class TransmissionLine extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    fromSource: string;

    @Column({ nullable: true })
    toSource?: string;

    @OneToMany(
        () => TransmissionConductor,
        (conductor) => conductor.transmissionLine,
        {
            cascade: true,
        }
    )
    conductors: Relation<TransmissionConductor[]>;

    @OneToMany(() => TransmissionTower, (tower) => tower.transmissionLine, {
        cascade: true,
    })
    towers: Relation<TransmissionTower[]>;
}
