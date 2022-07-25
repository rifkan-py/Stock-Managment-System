import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  title: string;

  @Column({
    length: 250,
  })
  description: string;

  @Column()
  catagory: string;

  @Column()
  ratings: number;

  @Column()
  price: number;
  @Column({
    array: true,
  })
  images: string;
}
