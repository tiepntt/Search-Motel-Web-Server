import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from "./District";

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: "10", unique: true })
  code: string;
  @Column({ type: "nvarchar", charset: "utf8", length: 255 })
  name: string;
  @OneToMany((type) => District, (o) => o.province, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  districts: District[];
}
