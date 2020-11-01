import { cloudkms } from "googleapis/build/src/apis/cloudkms";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apartment } from "./apartment";
import { ApartmentImage } from "../image/apartmentImage";
import { KitchenType } from "./type/kitchenType";
import { ToiletType } from "./type/toiletType";

@Entity()
export class ApartmentDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, type: "nvarchar", charset: "utf8" })
  description: string;
  @OneToOne((type) => Apartment, (o) => o.apartmentDetail, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  apartment: Apartment;
  @OneToMany((type) => ApartmentImage, (o) => o.apartmentDetail)
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
  priceWater: string;
  @Column({ nullable: true, default: false })
  isHasParking: boolean;
  // nóng lạnh : có/không
  // diện tích
  // giá phòng
  // giá điện
  // giá nước
  // chố để xe : có/không
  // ảnh minh họa (tối thiểu 3 ảnh)
}