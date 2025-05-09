import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportService } from '../sport/sport.service';
import { UserService } from '../user/user.service';
import { Plan } from './plan.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    private userService: UserService,
    private sportService: SportService,
  ) {}

  async create(userId: number, sportId: number, type: string): Promise<Plan> {
    if (type !== 'training' && type !== 'subscription') {
      throw new BadRequestException('Type must be either "training" or "subscription"');
    }
    const user = await this.userService.findOne(userId);
    const sport = await (await this.sportService.findAll()).find(s => s.id === sportId);
    if (!sport) throw new BadRequestException('Sport not found');
    const plan = this.planRepository.create({ user, sport, type });
    return this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find({ relations: ['user', 'sport'] });
  }

  async findOne(id: number): Promise<Plan> {
    const plan = await this.planRepository.findOne({ where: { id }, relations: ['user', 'sport'] });
    if (!plan) throw new BadRequestException('Plan not found');
    return plan;
  }

  async update(id: number, userId: number, sportId: number, type: string): Promise<Plan> {
    const plan = await this.findOne(id);
    if (type !== 'training' && type !== 'subscription') {
      throw new BadRequestException('Type must be either "training" or "subscription"');
    }
    const user = await this.userService.findOne(userId);
    const sport = await (await this.sportService.findAll()).find(s => s.id === sportId);
    if (!sport) throw new BadRequestException('Sport not found');
    plan.user = user;
    plan.sport = sport;
    plan.type = type;
    return this.planRepository.save(plan);
  }

  async delete(id: number): Promise<void> {
    const plan = await this.findOne(id);
    await this.planRepository.remove(plan);
  }
}