import { Plan } from 'src/plan/plan.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: ['coach', 'client'] })
  role: string;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Plan, (plan) => plan.user)
  plans: Plan[];
}