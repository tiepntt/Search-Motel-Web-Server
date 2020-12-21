import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from "../address/Location";
import { Apartment } from "./apartment";

@Entity()
export class ApartmentNear {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => Apartment, (o) => o.near, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  apartment: Apartment;
  @ManyToOne((type) => Location, { cascade: true })
  @JoinColumn()
  location: Location;
}
