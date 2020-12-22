import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { District } from "../address/District";
import { Location } from "../address/Location";
import { Province } from "../address/Province";
import { Street } from "../address/Street";
import { Ward } from "../address/Ward";
import { User } from "../user/User";
import { ApartmentDetail } from "./apartmentDetail";
import { ApartmentNear } from "./apartmentNearLocation";
import { ApartmentReport } from "./apartmentReport";
import { ApartmentReview } from "./apartmentReview";
import { ApartmentType } from "./apartmentType";
@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "nvarchar", charset: "utf8mb4" })
  title: string;
  @Column({ nullable: true, type: "nvarchar", charset: "utf8" })
  description: string;
  @Column()
  price: number;
  @Column({ default: 0 })
  area: number;
  @Column({ default: 0 })
  bathRoom: number;
  @Column({ default: 0 })
  bedRoom: number;
  @Column({ default: 0 })
  wardrobe: number;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
  @DeleteDateColumn()
  delete_at: Date;
  @ManyToOne((type) => User, { onUpdate: "CASCADE", onDelete: "SET NULL" })
  @JoinColumn()
  userDeleted: User;
  @ManyToOne((type) => User, (user) => user.apartments, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  user: User;
  @Column({ nullable: true, default: false })
  isApprove: boolean;
  @Column({ nullable: true })
  approve_at: Date;
  @Column({ nullable: true })
  deadline: Date;
  @ManyToOne((type) => User, { onDelete: "SET NULL", onUpdate: "NO ACTION" })
  userApprove: User;
  //type
  @ManyToOne((type) => ApartmentType, (o) => o.apartments, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  type: ApartmentType;
  @OneToOne((type) => ApartmentDetail, (o) => o.apartment, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  apartmentDetail: ApartmentDetail;
  @OneToMany((type) => ApartmentNear, (o) => o.apartment)
  @JoinColumn()
  near: ApartmentNear[];
  // address
  @ManyToOne((type) => Province, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  province: Province;
  @ManyToOne((type) => District, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  district: District;
  @ManyToOne((type) => Ward, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  ward: Ward;
  @ManyToOne((type) => Street, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  street: Street;
  @Column({ nullable: true, type: "nvarchar", charset: "utf8" })
  streetNo: string;

  @Column({
    nullable: true,
    default: "https://www.avatarins.com/image/homesmall.png",
  })
  avatar: string;
  @OneToMany((type) => ApartmentReview, (o) => o.apartment, {})
  @JoinColumn()
  reviews: ApartmentReview[];
  @OneToMany((type) => ApartmentReport, (o) => o.apartment, {})
  @JoinColumn()
  reports: ApartmentReport[];
}
