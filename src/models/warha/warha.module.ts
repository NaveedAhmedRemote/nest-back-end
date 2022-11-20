import { Module } from '@nestjs/common';
import { WarhaService } from './warha.service';
import { WarhaController } from './warha.controller';
import { Warha } from './entities/warha.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Warha])],

  controllers: [WarhaController],
  providers: [WarhaService],
  exports: [WarhaService],
})
export class WarhaModule {}
