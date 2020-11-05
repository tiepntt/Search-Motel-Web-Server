import { Expose } from "class-transformer";
import { type } from "os";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class ContactUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Expose()
  @Column({ nullable: true })
  email: string;
  @Expose()
  @Column({ length: 15, nullable: true })
  phone: string;
  @Expose()
  @Column({ length: 15, nullable: true })
  phone2: string;
  @Expose()
  @Column({ charset: "utf8", type: "nvarchar", nullable: true })
  address: string;
  @Expose()
  @OneToOne((type) => User, {
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;
}
