import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AvatarUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: true,
    default: "https://www.avatarins.com/image/homesmall.png",
  })
  url: string;
}
