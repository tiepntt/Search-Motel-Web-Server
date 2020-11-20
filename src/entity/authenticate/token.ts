import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../user/Role";
import { User } from "../user/User";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
  @ManyToOne((type) => Role, { onDelete: "CASCADE" })
  @JoinColumn()
  role: Role;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
