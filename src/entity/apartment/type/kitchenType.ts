import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class KitchenType {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: "nvarchar", charset: "utf8" })
  name: string;
  @Column({ unique: true, length: 10 })
  code: string;
}
