import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from "typeorm"
import { Exercise } from "./Exercises";

@Entity()
export class Groups {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    sub_group: string

    @ManyToOne(() => Exercise, exercise => exercise.group)
    @JoinTable()
    exercise: Exercise[];

}
