import { Expose } from "class-transformer";
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
  @Column()
  code: string;
  @Expose()
  @Column({ type: "nvarchar", length: 25, charset: "utf8" })
  name: string;
  @Expose()
  @ManyToMany((type) => District, (o) => o.streets, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  districts: District[];
  @OneToMany((type) => Location, (o) => o.street)
  @JoinColumn()
  locations: Location[];
}
