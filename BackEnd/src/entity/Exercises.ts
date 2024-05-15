import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Groups } from "./Groups";
import { Training } from "./Training";

@Entity()
export class Exercise{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToMany(() => Groups, group => group.exercise)
    @JoinColumn()
    group: Groups;

    @ManyToMany(() => Training, training => training.exercise)
    @JoinTable()
    training: Training[];
}