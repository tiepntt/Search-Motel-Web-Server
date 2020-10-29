import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30, unique: true, nullable: false })
  code: string;
  @Column({ length: 30, unique: true, nullable: false })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true, default: false })
  isApproveApartment: boolean;
  @Column({ nullable: true, default: false })
  isApproveUser: boolean;
  @Column({ nullable: true, default: false })
  isApproveComment: boolean;
  @Column({ nullable: true, default: false })
  isManager: boolean;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
  @DeleteDateColumn()
  @Exclude()
  delete_at: Date;
  @OneToMany((type) => User, (user) => user.role, { onUpdate: "CASCADE" })
  @JoinColumn()
  users: User[];
}
