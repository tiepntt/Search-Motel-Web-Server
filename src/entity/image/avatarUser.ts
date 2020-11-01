import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User";

@Entity()
export class AvatarUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
}
