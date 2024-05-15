import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm"
import { Training } from "./Training"

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

    @ManyToOne(() => Training, training => training.users)
    @JoinTable()
    training: Training[];

}
