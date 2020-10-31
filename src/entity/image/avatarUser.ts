import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/User";

@Entity()
export class AvatarUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @OneToOne((type) => User, (user) => user.avatar)
  @JoinColumn()
  user: User;
}
