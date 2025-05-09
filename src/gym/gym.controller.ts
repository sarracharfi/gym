import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Gym } from './gym.entity';
import { GymService } from './gym.service';

@Controller('gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post()
  create(@Body('name') name: string): Promise<Gym> {
    return this.gymService.create(name);
  }

  @Get()
  findAll(): Promise<Gym[]> {
    return this.gymService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Gym> {
    return this.gymService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<Gym> {
    return this.gymService.update(id, name);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gymService.delete(id);
  }

  @Post(':gymId/sports/:sportId')
  addSportToGym(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Param('sportId', ParseIntPipe) sportId: number,
  ): Promise<Gym> {
    return this.gymService.addSportToGym(gymId, sportId);
  }
}