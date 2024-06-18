import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("bytea")
  data: Buffer;
    
  @OneToMany(() => User, users => users.images)
  users: User[];  


}
