import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from "typeorm";

// eslint-disable-next-line import/no-cycle
import TransmissionLine from "./TransmissionLine.model";

@Entity()
export default class TransmissionConductor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    fromPhase: number;

    @Column()
    toPhase: number;

    @Column()
    bundleNumber: number;

    @Column()
    bundleSpacing: number;

    @Column()
    isNeutral: boolean;

    @Column()
    typeId: number;

    @ManyToOne(() => TransmissionLine, (line) => line.conductors, {
        onDelete: "CASCADE",
    })
    transmissionLine: Relation<TransmissionLine>;
}
