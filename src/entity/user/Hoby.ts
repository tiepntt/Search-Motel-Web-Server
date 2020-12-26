import { Type } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apartment } from "../apartment/apartment";
import { User } from "./User";

@Entity()
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((o) => User, { cascade: true })
  @JoinColumn()
  user: User;
  @ManyToOne((o) => Apartment, { cascade: true })
  @JoinColumn()
  apartment: Apartment;
}
