import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './sport.entity';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(Sport)
    private sportRepository: Repository<Sport>,
  ) {}

  async create(name: string): Promise<Sport> {
    const sport = this.sportRepository.create({ name });
    return this.sportRepository.save(sport);
  }

  async findAll(): Promise<Sport[]> {
    return this.sportRepository.find({ relations: ['gyms'] });
  }

  async findOne(id: number): Promise<Sport> {
    const sport = await this.sportRepository.findOne({ where: { id }, relations: ['gyms'] });
    if (!sport) throw new BadRequestException('Sport not found');
    return sport;
  }

  async update(id: number, name: string): Promise<Sport> {
    const sport = await this.findOne(id);
    sport.name = name;
    return this.sportRepository.save(sport);
  }

  async delete(id: number): Promise<void> {
    const sport = await this.findOne(id);
    await this.sportRepository.remove(sport);
  }
}