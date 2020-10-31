import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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
  @ManyToOne((type) => Province, (o) => o.locations, { cascade: true })
  @JoinColumn()
  province: Province;
  @ManyToOne((type) => District, (o) => o.locations, { cascade: true })
  @JoinColumn()
  district: District;
  @ManyToOne((type) => Ward, (o) => o.locations, { cascade: true })
  @JoinColumn()
  ward: Ward;
  @ManyToOne((type) => Street, (o) => o.locations, { cascade: true })
  @JoinColumn()
  street: Street;
  @Column({ nullable: true })
  streetNo: string;

  //address
}
