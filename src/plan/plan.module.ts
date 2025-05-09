import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportModule } from '../sport/sport.module';
import { UserModule } from '../user/user.module';
import { PlanController } from './plan.controller';
import { Plan } from './plan.entity';
import { PlanService } from './plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), UserModule, SportModule],
  providers: [PlanService],
  controllers: [PlanController],
})
export class PlanModule {}