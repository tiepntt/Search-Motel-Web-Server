import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from "./District";

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column({ charset: "utf8", type: "nvarchar" })
  name: string;
  @ManyToOne((type) => District, (o) => o.wards, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  district: District;
}
