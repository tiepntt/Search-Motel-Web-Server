import {
  Column,
    CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apartment } from "../apartment/apartment";
import { User } from "../user/User";

@Entity()
export class NotificationApartment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text", charset: "utf8" })
  context: string;
  @ManyToOne((type) => Apartment, { onDelete: "CASCADE" })
  @JoinColumn()
  apartment: Apartment;
  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  userCreate: User;
  @CreateDateColumn()
  creat_at: Date;
  @ManyToMany((type) => User, (o) => o.notificationSeen, {
    onUpdate: "CASCADE",
  })
  @JoinTable()
  userSeen: User[];
  @ManyToMany((type) => User, (o) => o.notificationSubscribe)
  @JoinTable()
  userSubscribe: User[];
}
