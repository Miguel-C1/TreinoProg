import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Training } from "./Training";
import { Groups } from "./Groups";
import { User } from "./User";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Groups, group => group.exercise)
    group: Groups;

    @ManyToOne(() => User, user => user.exercises)
    user: User;  

    @ManyToMany(() => Training, training => training.exercises)
    trainings: Training[];
}
