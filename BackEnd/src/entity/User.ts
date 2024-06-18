import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm"
import { Training } from "./Training"
import { Image } from "./Image"
import { Acompanhamento } from "./Acompanhamento"
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    login: string

    @Column()
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

    @ManyToOne(() => Acompanhamento, acompanhamento => acompanhamento.users)
    @JoinTable()
    acompanhamento: Acompanhamento[];

}
