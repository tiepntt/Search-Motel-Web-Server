import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from "./District";
import { Province } from "./Province";
import { Ward } from "./Ward";

@Entity()
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column({ type: "nvarchar", charset: "utf8", length: 255 })
  name: string;
  @OneToOne((type) => Province)
  @JoinColumn()
  province: Province;
  @OneToOne((type) => District)
  @JoinColumn()
  district: District;
  @OneToOne((type) => Ward)
  @JoinColumn()
  ward: Ward;
}
