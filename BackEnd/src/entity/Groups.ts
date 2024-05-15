import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Exercise } from "./Exercises";

@Entity()
export class Groups {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    sub_group: string;

    @OneToMany(() => Exercise, exercise => exercise.group)
    @JoinColumn()    
    exercise: Exercise[];
}
