import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Apartment } from "../apartment/apartment";
import { AvatarUser } from "../image/avatarUser";
import { ContactUser } from "./Contact";

import { Role } from "./Role";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30, unique: true })
  personNo: string;
  @Index({ fulltext: true })
  @Column({ length: 30, unique: true })
  email: string;
  @Column({ nullable: true, default: "Normal" })
  loginType: string;
  @Column({ length: 30 })
  password: string;
  @Index({ fulltext: true })
  @Column({ type: "nvarchar", charset: "utf8" })
  name: string;
  @CreateDateColumn({ nullable: false })
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
  @DeleteDateColumn()
  delete_at: Date;
  @Column({ nullable: true, default: false })
  isBlock: boolean;
  @Column({ nullable: true, default: false })
  isApprove: boolean;
  @ManyToOne((type) => Role, (role) => role.users, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  role: Role;
  @ManyToOne((type) => User, (user) => user.userChild, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn()
  userManager: User;
  @OneToMany((type) => User, (user) => user.userManager, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn()
  userChild: User[];
  @OneToOne((type) => ContactUser, (contact) => contact.user, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn()
  contactUser: ContactUser;
  @OneToMany((type) => Apartment, (o) => o.user, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn()
  apartments: Apartment[];
  @OneToOne((type) => AvatarUser, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn()
  avatar: AvatarUser;
}
