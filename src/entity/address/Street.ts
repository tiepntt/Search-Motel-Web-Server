import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from "./District";
import { Location } from "./Location";

@Entity()
export class Street {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;
  @Expose()
  @Column({ unique: true, length: 20 })
  code: string;
  @Expose()
  @Column({ type: "nvarchar", length: 25, charset: "utf8" })
  name: string;
  @Expose()
  @ManyToOne((type) => District, (o) => o.streets)
  @JoinColumn()
  districts: District;
  @OneToMany((type) => Location, (o) => o.street)
  @JoinColumn()
  locations: Location[];
}
