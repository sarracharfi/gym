import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GymService } from '../gym/gym.service';
import { UserService } from '../user/user.service';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    private userService: UserService,
    private gymService: GymService,
  ) {}

  async create(userId: number, gymId: number): Promise<Subscription> {
    const user = await this.userService.findOne(userId);
    const gym = await (await this.gymService.findAll()).find(g => g.id === gymId);
    if (!gym) throw new BadRequestException('Gym not found');
    const subscription = this.subscriptionRepository.create({ user, gym });
    return this.subscriptionRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find({ relations: ['user', 'gym'] });
  }

  async findOne(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({ where: { id }, relations: ['user', 'gym'] });
    if (!subscription) throw new BadRequestException('Subscription not found');
    return subscription;
  }

  async update(id: number, userId: number, gymId: number): Promise<Subscription> {
    const subscription = await this.findOne(id);
    const user = await this.userService.findOne(userId);
    const gym = await (await this.gymService.findAll()).find(g => g.id === gymId);
    if (!gym) throw new BadRequestException('Gym not found');
    subscription.user = user;
    subscription.gym = gym;
    return this.subscriptionRepository.save(subscription);
  }

  async delete(id: number): Promise<void> {
    const subscription = await this.findOne(id);
    await this.subscriptionRepository.remove(subscription);
  }
}