import { Exclude } from "class-transformer";
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

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30, unique: true, nullable: false })
  code: string;
  @Column({ length: 30, unique: true, nullable: false })
  name: string;
  @Column({ default: 0 })
  time: number;
  @Column({ default: 0 })
  price: number;
}
