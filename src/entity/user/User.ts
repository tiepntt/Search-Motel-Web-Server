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
import { Apartment } from "../apartment/apartment";
import { AvatarUser } from "../image/avatarUser";
import { ContactUser } from "./Contact";

import { Role } from "./Role";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30, unique: true })
  username: string;
  @Column({ length: 30 })
  password: string;
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
  @OneToMany((type) => Apartment, (o) => o.user)
  @JoinColumn()
  apartments: Apartment[];
  @OneToOne((type) => AvatarUser, (o) => o.user, { cascade: true })
  @JoinColumn()
  avatar: AvatarUser;
}
