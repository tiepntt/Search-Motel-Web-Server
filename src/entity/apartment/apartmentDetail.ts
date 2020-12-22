import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Apartment } from "./apartment";
import { ApartmentImage } from "../image/apartmentImage";
import { KitchenType } from "./type/kitchenType";
import { ToiletType } from "./type/toiletType";

@Entity()
export class ApartmentDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, type: "text" })
  description: string;
  @OneToOne((type) => Apartment, (o) => o.apartmentDetail, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  apartment: Apartment;
  @OneToMany((type) => ApartmentImage, (o) => o.apartmentDetail, {
    cascade: true,
  })
  @JoinColumn()
  images: ApartmentImage[];
  @ManyToOne((type) => ToiletType, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  toiletType: ToiletType;
  // vệ sinh : khép kín/ k khép kín
  // nhà bếp : bếp riêng/ bếp chung/ k nấu ăn
  @ManyToOne((type) => KitchenType, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  kitchenType: KitchenType;
  @Column({ nullable: true, default: false })
  isHasAirConditioner: boolean;
  // điều hòa : có /không
  //ban công : có /không
  @Column({ nullable: true, default: false })
  isHasBalcony: boolean;
  // thang máy : có / không
  @Column({ nullable: true, default: false })
  isHasElevator: boolean;
  @Column({ nullable: true, default: false })
  isHasFever: boolean;
  @Column({ nullable: true, default: 0 })
  acreage: number;
  @Column({ nullable: true, default: 0 })
  price: number;
  @Column({ nullable: true })
  priceElectricity: number;
  @Column({ nullable: true })
  priceWater: number;
  @Column({ nullable: true, default: false })
  isHasParking: boolean;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
}
