import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gym } from '../gym/gym.entity';
import { User } from '../user/user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @ManyToOne(() => Gym)
  gym: Gym;
}