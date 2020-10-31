import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apartment } from "./apartment";

@Entity()
export class ApartmentType {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: "nvarchar", length: 10, charset: "utf8", unique: true })
  code: string;
  @Column({ type: "nvarchar", charset: "utf8" })
  name: string;
  @OneToMany((type) => Apartment, (o) => o.type)
  @JoinColumn()
  apartments: Apartment[];
}
