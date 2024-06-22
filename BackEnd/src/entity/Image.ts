import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  imagem: string;
    
  @ManyToOne(() => User, users => users.images)
  users: User;  


}
