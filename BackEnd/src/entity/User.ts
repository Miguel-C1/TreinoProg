import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Training } from "./Training";
import { Image } from "./Image";
import { Acompanhamento } from "./Acompanhamento";
import { Exercise } from "./Exercises";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    login: string;

    @Column({ nullable: true })
    senha: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(() => Image, image => image.users)
    images: Image[];

    @OneToMany(() => Training, training => training.user)
    trainings: Training[];

    @OneToMany(() => Acompanhamento, acompanhamento => acompanhamento.user)
    acompanhamentos: Acompanhamento[];

    @OneToMany(() => Exercise, exercise => exercise.user)
    exercises: Exercise[];
}
