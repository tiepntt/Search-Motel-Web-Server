import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/User";
import { Apartment } from "./apartment";
export type Star = 1 | 2 | 3 | 4 | 5;
@Entity()
export class ApartmentReview {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "nvarchar", charset: "utf8", nullable: true })
  content: string;
  @Column({ default: 5 })
  star: number;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne((type) => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
  @ManyToOne((type) => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  userApprove: User;
  @Column({ default: false })
  isApprove: boolean;

  @ManyToOne((type) => Apartment, (o) => o.reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  apartment: Apartment;
}
