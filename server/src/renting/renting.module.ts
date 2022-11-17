import { Module } from '@nestjs/common';
import { RentingController } from './renting.controller';
import { RentingService } from './renting.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RentingEntity} from './renting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentingEntity])],
  controllers: [RentingController],
  providers: [RentingService],
})
export class RentingModule {}
