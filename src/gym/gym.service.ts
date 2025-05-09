import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportService } from '../sport/sport.service';
import { Gym } from './gym.entity';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(Gym)
    private gymRepository: Repository<Gym>,
    private sportService: SportService,
  ) {}

  async create(name: string): Promise<Gym> {
    const gym = this.gymRepository.create({ name });
    return this.gymRepository.save(gym);
  }

  async findAll(): Promise<Gym[]> {
    return this.gymRepository.find({ relations: ['sports'] });
  }

  async addSportToGym(gymId: number, sportId: number): Promise<Gym> {
    const gym = await this.gymRepository.findOne({ where: { id: gymId }, relations: ['sports'] });
    if (!gym) throw new BadRequestException('Gym not found');

    const sport = await (await this.sportService.findAll()).find(s => s.id === sportId);
    if (!sport) throw new BadRequestException('Sport not found');

    gym.sports = gym.sports || [];
    gym.sports.push(sport);
    return this.gymRepository.save(gym);
  }

  async findOne(id: number): Promise<Gym> {
    const gym = await this.gymRepository.findOne({ where: { id }, relations: ['sports'] });
    if (!gym) throw new BadRequestException('Gym not found');
    return gym;
  }

  async update(id: number, name: string): Promise<Gym> {
    const gym = await this.findOne(id); 
    gym.name = name;
    return this.gymRepository.save(gym);
  }

  async delete(id: number): Promise<void> {
    const gym = await this.findOne(id); 
    await this.gymRepository.remove(gym);
  }
}