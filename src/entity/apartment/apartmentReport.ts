import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/User";
import { Apartment } from "./apartment";

@Entity()
export class ApartmentReport {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "nvarchar", charset: "utf8" })
  content: string;
  @CreateDateColumn()
  create_at: Date;
  @ManyToOne((type) => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
  @ManyToOne((type) => Apartment, (o) => o.reports, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  apartment: Apartment;
  @Column({ nullable: true, default: false })
  isApprove: boolean;
}
