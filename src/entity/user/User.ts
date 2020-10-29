import { Exclude, Expose } from "class-transformer";
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
  id: number;
  @Column({ length: 30, unique: true })
  username: string;
  @Exclude()
  @Column({ length: 255 })
  password: string;
  @CreateDateColumn({ nullable: false })
  create_at: Date;
  @Exclude()
  @UpdateDateColumn()
  update_at: Date;
  @DeleteDateColumn()
  delete_at: Date;
  @Column({ nullable: true, default: false })
  isBlock: boolean;
  @Column({ nullable: true, default: false })
  isApprove: boolean;

  @ManyToOne((type) => Role, (role) => role.users, { onUpdate: "CASCADE" })
  @JoinColumn()
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
