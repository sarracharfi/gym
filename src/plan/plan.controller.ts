import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Plan } from './plan.entity';
import { PlanService } from './plan.service';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('sportId', ParseIntPipe) sportId: number,
    @Body('type') type: string,
  ): Promise<Plan> {
    return this.planService.create(userId, sportId, type);
  }

  @Get()
  findAll(): Promise<Plan[]> {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Plan> {
    return this.planService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
    @Body('sportId', ParseIntPipe) sportId: number,
    @Body('type') type: string,
  ): Promise<Plan> {
    return this.planService.update(id, userId, sportId, type);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.planService.delete(id);
  }
}