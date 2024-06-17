import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm"
import { Training } from "./Training"
import { Image } from "./Image"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @ManyToOne(() => Image, images => images.users)
    @JoinTable()
    images: Image[];

    @ManyToOne(() => Training, training => training.users)
    @JoinTable()
    training: Training[];

}
