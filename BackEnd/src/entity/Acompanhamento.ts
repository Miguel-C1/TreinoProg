import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Training } from "./Training";

@Entity()
export class Acompanhamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: Date;

    @ManyToOne(() => User, user => user.acompanhamentos)
    user: User;

    @ManyToOne(() => Training, training => training.acompanhamentos)
    training: Training;
}
