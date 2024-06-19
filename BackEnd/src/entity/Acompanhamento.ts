import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Training } from "./Training";
import { Image } from "./Image";

@Entity()
export class Acompanhamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: Date;

    @Column()
    taPago: boolean;

    @ManyToOne(() => User, user => user.acompanhamentos)
    user: User;

    @ManyToOne(() => Training, training => training.acompanhamentos)
    training: Training;

    @OneToOne(() => Image)
    @JoinColumn()
    image: Image;
}
