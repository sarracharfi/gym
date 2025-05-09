import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(name: string, role: string): Promise<User> {
    if (role !== 'coach' && role !== 'client') {
      throw new BadRequestException('Role must be either "coach" or "client"');
    }
    const user = this.userRepository.create({ name, role });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['subscriptions', 'plans'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['subscriptions', 'plans'] });
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async update(id: number, name: string, role: string): Promise<User> {
    const user = await this.findOne(id);
    if (role !== 'coach' && role !== 'client') {
      throw new BadRequestException('Role must be either "coach" or "client"');
    }
    user.name = name;
    user.role = role;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}