import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from "./District";
import { Province } from "./Province";
import { Street } from "./Street";
import { Ward } from "./Ward";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "nvarchar", charset: "utf8" })
  name: string;
  @Column({ nullable: true, type: "nvarchar", charset: "utf8" })
  description: string;
  @ManyToOne((type) => Province, (o) => o.locations, { onDelete: "SET NULL" })
  @JoinColumn()
  province: Province;
  @ManyToOne((type) => District, (o) => o.locations, { onDelete: "SET NULL" })
  @JoinColumn()
  district: District;
  @ManyToOne((type) => Ward, (o) => o.locations, { onDelete: "SET NULL" })
  @JoinColumn()
  ward: Ward;
  @ManyToOne((type) => Street, (o) => o.locations, { onDelete: "SET NULL" })
  @JoinColumn()
  street: Street;
  @Column({ nullable: true })
  streetNo: string;

  //address
}
