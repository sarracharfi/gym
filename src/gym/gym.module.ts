import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportModule } from '../sport/sport.module';
import { GymController } from './gym.controller';
import { Gym } from './gym.entity';
import { GymService } from './gym.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gym]),
    SportModule, 
  ],
  providers: [GymService],
  controllers: [GymController],
  exports: [GymService],
})
export class GymModule {}