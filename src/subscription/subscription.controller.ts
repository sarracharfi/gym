import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body('userId', ParseIntPipe) userId: number, @Body('gymId', ParseIntPipe) gymId: number): Promise<Subscription> {
    return this.subscriptionService.create(userId, gymId);
  }

  @Get()
  findAll(): Promise<Subscription[]> {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Subscription> {
    return this.subscriptionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
    @Body('gymId', ParseIntPipe) gymId: number,
  ): Promise<Subscription> {
    return this.subscriptionService.update(id, userId, gymId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.subscriptionService.delete(id);
  }
}