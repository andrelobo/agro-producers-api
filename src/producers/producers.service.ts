import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as cpfCnpj from 'cpf-cnpj-validator';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from '../producers/dto/create-producer.dto';

@Injectable()
export class ProducersService {
  update(id: number, createProducerDto: CreateProducerDto): Promise<Producer> {
    return this.producersRepository.preload({
      id,
      ...createProducerDto,
    });
  }

  constructor(
    @InjectRepository(Producer)
    private producersRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    // Validação de CPF/CNPJ
    const isCpfValid = cpfCnpj.cpf.isValid(createProducerDto.cpfOrCnpj);
    const isCnpjValid = cpfCnpj.cnpj.isValid(createProducerDto.cpfOrCnpj);
    if (!isCpfValid && !isCnpjValid) {
      throw new BadRequestException('CPF ou CNPJ inválido.');
    }

    // Validação de áreas
    if (
      createProducerDto.arableArea + createProducerDto.vegetationArea >
      createProducerDto.totalArea
    ) {
      throw new BadRequestException(
        'A soma das áreas agricultável e vegetação não pode ser maior que a área total.',
      );
    }

    // Verificar duplicatas
    const existingProducer = await this.producersRepository.findOne({
      where: {
        cpfOrCnpj: createProducerDto.cpfOrCnpj,
        farmName: createProducerDto.farmName,
      },
    });
    if (existingProducer) {
      throw new BadRequestException(
        'Produtor já cadastrado com este CPF/CNPJ e nome de fazenda.',
      );
    }

    const producer = this.producersRepository.create(createProducerDto);
    return this.producersRepository.save(producer).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  findAll(): Promise<Producer[]> {
    return this.producersRepository.find();
  }

  findOne(id: number): Promise<Producer> {
    return this.producersRepository.findOne({ where: { id } }).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  async remove(id: number): Promise<void> {
    await this.producersRepository.delete(id).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }
}
