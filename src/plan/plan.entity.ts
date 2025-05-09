import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sport } from '../sport/sport.entity';
import { User } from '../user/user.entity';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; 

  @ManyToOne(() => User, (user) => user.plans)
  user: User;

  @ManyToOne(() => Sport)
  sport: Sport;
}