import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 255, unique: true })
  username: string;
  @Column({ length: 255 })
  password: string;
  @CreateDateColumn({ nullable: false })
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
  @Column({ nullable: true, default: false })
  isBlock: boolean;
  @Column({ nullable: true, default: false })
  isAprove: boolean;
}
