import { Module } from '@nestjs/common';
import { LaunchService } from './launch.service';
import { LaunchController } from './launch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Launch } from './entities/launch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Launch])],

  controllers: [LaunchController],
  providers: [LaunchService],
  exports:[LaunchService]
})
export class LaunchModule {}
