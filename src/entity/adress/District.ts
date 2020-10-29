import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Province } from "./Province";
import { Street } from "./Street";
import { Ward } from "./Ward";

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column({ type: "nvarchar", charset: "utf8", length: 255 })
  name: string;
  @OneToMany((type) => Ward, (o) => o.district, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  wards: Ward[];
  @ManyToOne((type) => Province, (o) => o.districts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  province: Province;
  @ManyToMany((type) => Street, (o) => o.districts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  streets: Street[];
}
