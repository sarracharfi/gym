import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gym } from '../gym/gym.entity';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Gym, (gym) => gym.sports)
  gyms: Gym[];
}