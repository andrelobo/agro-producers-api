import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producers.entity';
import { CreateProducerDto } from './dto/create-producer.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private producersRepository: Repository<Producer>,
  ) {}

  create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const producer = this.producersRepository.create(createProducerDto);
    return this.producersRepository.save(producer);
  }

  findAll(): Promise<Producer[]> {
    return this.producersRepository.find();
  }

  async findOne(id: number): Promise<Producer> {
    return this.producersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.producersRepository.delete(id);
  }
}
