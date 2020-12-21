import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apartment } from "../apartment/apartment";
import { District } from "./District";
import { Location } from "./Location";

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 20 })
  code: string;
  @Column({ charset: "utf8", type: "nvarchar" })
  name: string;
  @ManyToOne((type) => District, (o) => o.wards, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  district: District;
  @OneToMany((type) => Location, (o) => o.ward)
  @JoinColumn()
  locations: Location[];
  @OneToMany((type) => Apartment, (o) => o.ward)
  @JoinColumn()
  aparmtemtns: Apartment[];
}
