import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { RealEstate } from "./real_estate.entities";

@Entity("Address")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  street: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ nullable: true, length: 6 })
  number: string;

  @Column({ length: 20 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @OneToOne(() => RealEstate, (realEstate) => realEstate.address)
  realEstate: RealEstate;
}
export { Address };
