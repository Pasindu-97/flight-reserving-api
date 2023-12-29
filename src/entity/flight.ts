import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { FlightUser } from "./flightUser";

@Entity()
export class Flight extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  flightName: string;

  @Column({ type: "varchar", length: 255 })
  departure: string;

  @Column({ type: "varchar", length: 255 })
  destination: string;

  @Column({ type: "time" })
  date: string;

  @Column({ type: "date" })
  time: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FlightUser, (flightUser) => flightUser.flight)
  flightUsers: FlightUser[];
}
