import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpfOrCnpj: string;

  @Column()
  name: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('decimal')
  totalArea: number;

  @Column('decimal')
  arableArea: number;

  @Column('decimal')
  vegetationArea: number;

  @Column('simple-array')
  crops: string[];
}
