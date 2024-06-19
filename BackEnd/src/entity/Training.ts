import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercises";
import { User } from "./User";
import { Acompanhamento } from "./Acompanhamento";

@Entity()
export class Training {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: string;

    @ManyToMany(() => Exercise, exercise => exercise.trainings)
    @JoinTable()
    exercises: Exercise[];

    @ManyToOne(() => User, user => user.trainings)
    user: User;

    @ManyToOne(() => Acompanhamento, acompanhamento => acompanhamento.training)
    acompanhamentos: Acompanhamento[];
}
