import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymModule } from '../gym/gym.module';
import { UserModule } from '../user/user.module';
import { SubscriptionController } from './subscription.controller';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]), // Provides SubscriptionRepository
    UserModule, // Provides UserService (dependency of SubscriptionService)
    GymModule,  // Provides GymService (dependency of SubscriptionService)
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  exports: [SubscriptionService], // Export SubscriptionService if other modules need it
})
export class SubscriptionModule {}