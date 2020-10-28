import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({ length: 15, nullable: false })
  phone: string;
  @Column({ length: 15, nullable: true })
  phone2: string;
}
