import { Column, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Exercise } from "./Exercises"
import { User } from "./User"


export class Training {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    date: string

    @ManyToMany(() => Exercise, exercise => exercise.training)
    @JoinTable()
    exercise: Exercise[];

    @OneToMany(() => User, user => user.training)
    @JoinTable()
    user: User;
}
    