import {forwardRef, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { ClientModule } from './client/client.module';
import { RentingModule } from './renting/renting.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmAsyncConfig} from './config/typeorm.config';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
      forwardRef(() => RoomModule),
      forwardRef(() => ClientModule),
      forwardRef(() => RentingModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
