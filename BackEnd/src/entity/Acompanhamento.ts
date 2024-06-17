import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Training } from "./Training";


@Entity()
export class Acompanhamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: Date;
  
    @OneToMany(() => User, user => user.acompanhamento)
    users: User;

    @OneToMany(() => Training, training => training.acompanhamento)
    training: Training;


}
