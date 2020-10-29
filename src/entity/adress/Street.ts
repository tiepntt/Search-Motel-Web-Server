import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContactUserService } from "../../models/User/contact.model";
import { District } from "./District";

@Entity()
export class Street {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column({ type: "nvarchar", length: 25, charset: "utf8" })
  name: string;
  @ManyToMany((type) => District, (o) => o.streets, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  districts: District[];
}
