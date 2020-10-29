import { mapping } from "auto-mapping";
import { Exclude, Expose } from "class-transformer";
import { type } from "os";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContactUser } from "./Contact";

import { Role } from "./Role";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @mapping({ type: Number })
  id: number;
  @Column({ length: 30, unique: true })
  @mapping({ type: String })
  username: string;
  @Exclude()
  @Column({ length: 255 })
  @mapping({ type: String })
  password: string;
  @CreateDateColumn({ nullable: false })
  @mapping({ type: Date })
  create_at: Date;
  @Exclude()
  @UpdateDateColumn()
  @mapping({ type: Date })
  update_at: Date;
  @DeleteDateColumn()
  delete_at: Date;
  @Column({ nullable: true, default: false })
  @mapping({ type: Boolean })
  isBlock: boolean;
  @Column({ nullable: true, default: false })
  isApprove: boolean;

  @ManyToOne((type) => Role, (role) => role.users, { onUpdate: "CASCADE" })
  @JoinColumn()
  @mapping({ type: Role })
  role: Role;
  @ManyToOne((type) => User, (user) => user.userChild)
  @JoinColumn()
  userManager: User;
  @OneToMany((type) => User, (user) => user.userManager)
  @JoinColumn()
  userChild: User[];
  @OneToOne((type) => ContactUser, (contact) => contact.user)
  @JoinColumn()
  contactUser: ContactUser;
}
