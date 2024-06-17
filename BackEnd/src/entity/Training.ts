import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Exercise } from "./Exercises"
import { User } from "./User"
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
    exercises: Exercise[]; 
    @OneToMany(() => User, user => user.training)
    users: User;  

    @ManyToOne(() => Acompanhamento, acompanhamento => acompanhamento.training)
    @JoinTable()
    acompanhamento: Acompanhamento[];
}
