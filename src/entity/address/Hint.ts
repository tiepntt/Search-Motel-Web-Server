import { type } from "os";
import { Column, Entity, In, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hint {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({ fulltext: true })
  @Column({ type: "text", charset: "utf8" })
  name: string;
  @Index()
  @Column({
    type: "nvarchar",
    charset: "utf8",
    length: 30,
    nullable: true,
    default: "",
  })
  districtName: string;
  @Index()
  @Column({
    type: "nvarchar",
    charset: "utf8",
    length: 30,
    nullable: true,
    default: "",
  })
  wardName: string;
  @Index()
  @Column({ type: "nvarchar", charset: "utf8", length: 30, default: "" })
  provinceName: string;

  //address
}
