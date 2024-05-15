import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Groups } from "./Groups";
import { Training } from "./Training";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Groups, group => group.exercise)
    group: Groups;

    @ManyToMany(() => Training, training => training.exercises)
    @JoinTable()  
    trainings: Training[];
}
