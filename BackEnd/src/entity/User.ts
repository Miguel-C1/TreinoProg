import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm"
import { Training } from "./Training"
import { Image } from "./Image"
import { Acompanhamento } from "./Acompanhamento"
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata"
import { Exercise } from "./Exercises"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column({nullable: true})
    login: string

    @Column({nullable: true})
    senha: string  

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

    @ManyToOne(() => Exercise, exercise => exercise.users)
    @JoinTable()
    exercise: Exercise[];

    @ManyToOne(() => Acompanhamento, acompanhamento => acompanhamento.users)
    @JoinTable()
    acompanhamento: Acompanhamento[];

}
