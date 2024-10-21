import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import * as cpfCnpj from 'cpf-cnpj-validator';

describe('ProducersService', () => {
  let service: ProducersService;
  let repository: Repository<Producer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: getRepositoryToken(Producer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
    repository = module.get<Repository<Producer>>(getRepositoryToken(Producer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a producer with valid data', async () => {
    const createProducerDto: CreateProducerDto = {
      cpfOrCnpj: cpfCnpj.cpf.generate(),
      name: 'Produtor Teste',
      farmName: 'Fazenda Sorriso',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 100.0,
      arableArea: 70.0,
      vegetationArea: 30.0,
      crops: ['Soja', 'Milho'],
    };

    jest.spyOn(repository, 'save').mockResolvedValue(createProducerDto as any);
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockReturnValue(createProducerDto as any); // Mock para create

    const result = await service.create(createProducerDto);
    expect(result).toEqual(createProducerDto);
  });

  it('should throw an error for invalid CPF/CNPJ', async () => {
    const createProducerDto: CreateProducerDto = {
      cpfOrCnpj: '12345678901', // Invalid CPF
      name: 'Produtor Teste',
      farmName: 'Fazenda Alegria',
      city: 'Rio de Janeiro',
      state: 'RJ',
      totalArea: 100.0,
      arableArea: 70.0,
      vegetationArea: 30.0,
      crops: ['Soja', 'Milho'],
    };

    await expect(service.create(createProducerDto)).rejects.toThrow(
      'CPF ou CNPJ inválido.',
    );
  });

  it('should throw an error for invalid area sum', async () => {
    const createProducerDto: CreateProducerDto = {
      cpfOrCnpj: cpfCnpj.cpf.generate(),
      name: 'Produtor Teste',
      farmName: 'Fazenda Felicidade',
      city: 'Belo Horizonte',
      state: 'MG',
      totalArea: 100.0,
      arableArea: 80.0,
      vegetationArea: 30.0, // Sum > totalArea
      crops: ['Soja', 'Milho'],
    };

    await expect(service.create(createProducerDto)).rejects.toThrow(
      'A soma das áreas agricultável e vegetação não pode ser maior que a área total.',
    );
  });

  it('should throw an error for duplicate producer', async () => {
    const createProducerDto: CreateProducerDto = {
      cpfOrCnpj: cpfCnpj.cpf.generate(),
      name: 'Produtor Teste',
      farmName: 'Fazenda Tranquilidade',
      city: 'Curitiba',
      state: 'PR',
      totalArea: 100.0,
      arableArea: 70.0,
      vegetationArea: 30.0,
      crops: ['Soja', 'Milho'],
    };

    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(createProducerDto as any);

    await expect(service.create(createProducerDto)).rejects.toThrow(
      'Produtor já cadastrado com este CPF/CNPJ e nome de fazenda.',
    );
  });
});
