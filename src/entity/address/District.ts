import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from "./Location";
import { Province } from "./Province";
import { Street } from "./Street";
import { Ward } from "./Ward";

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 20 })
  code: string;
  @Column({ type: "nvarchar", charset: "utf8", length: 255 })
  name: string;
  @OneToMany((type) => Ward, (o) => o.district)
  @JoinColumn()
  wards: Ward[];
  @ManyToOne((type) => Province, (o) => o.districts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  province: Province;

  @ManyToMany((type) => Street, (o) => o.districts)
  @JoinColumn()
  streets: Street[];
  @OneToMany((type) => Location, (o) => o.district)
  @JoinColumn()
  locations: Location[];
}
