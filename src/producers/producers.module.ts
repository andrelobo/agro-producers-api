import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { Producer } from './entities/producer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  providers: [ProducersService],
  controllers: [ProducersController],
})
export class ProducersModule {}
