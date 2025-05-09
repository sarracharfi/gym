import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportController } from './sport.controller';
import { Sport } from './sport.entity';
import { SportService } from './sport.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sport])],
  providers: [SportService],
  controllers: [SportController],
  exports: [SportService], 
})
export class SportModule {}