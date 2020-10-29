import { type } from "os";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class ContactUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({ length: 15, nullable: false })
  phone: string;
  @Column({ length: 15, nullable: true })
  phone2: string;
  @OneToOne((type) => User, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}
