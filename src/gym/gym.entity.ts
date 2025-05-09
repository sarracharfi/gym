import { Sport } from 'src/sport/sport.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Sport, (sport) => sport.gyms)
  @JoinTable()
  sports: Sport[];
}