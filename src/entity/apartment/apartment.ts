import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from "../address/District";
import { Location } from "../address/Location";
import { Province } from "../address/Province";
import { Street } from "../address/Street";
import { Ward } from "../address/Ward";
import { User } from "../user/User";
import { ApartmentDetail } from "./apartmentDetail";
import { ApartmentType } from "./apartmentType";
@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "nvarchar", charset: "utf8" })
  title: string;
  @Column({ nullable: true, type: "nvarchar", charset: "utf8" })
  description: string;
  @Column()
  price: number;
  @CreateDateColumn()
  create_at: Date;
  @ManyToOne((type) => User, (user) => user.apartments, { cascade: true })
  @JoinColumn()
  user: User;
  @Column({ nullable: true, default: false })
  isApprove: boolean;
  @Column({ nullable: true })
  approve_at: Date;
  @Column({ nullable: false })
  deadline: Date;
  @ManyToOne((type) => User)
  userApprove: User;
  //type
  @ManyToOne((type) => ApartmentType, (o) => o.apartments, { cascade: true })
  @JoinColumn()
  type: ApartmentType;
  @OneToOne((type) => ApartmentDetail, (o) => o.apartment)
  @JoinColumn()
  apartmentDetail: ApartmentDetail;
  // address
  @ManyToOne((type) => Province, { cascade: true })
  @JoinColumn()
  province: Province;
  @ManyToOne((type) => District, { cascade: true })
  @JoinColumn()
  district: District;
  @ManyToOne((type) => Ward, { cascade: true })
  @JoinColumn()
  ward: Ward;
  @ManyToOne((type) => Street, { cascade: true })
  @JoinColumn()
  street: Street;
  @Column({ nullable: true, type: "nvarchar", charset: "utf8" })
  streetNo: string;
  @ManyToMany((type) => Location)
  @JoinTable()
  LocationsNear: Location[];
}
