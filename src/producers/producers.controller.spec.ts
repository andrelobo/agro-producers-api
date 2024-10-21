import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';

describe('ProducersController', () => {
  let controller: ProducersController;
  let service: ProducersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a producer', async () => {
    const createProducerDto: CreateProducerDto = {
      cpfOrCnpj: '123.456.789-10',
      name: 'João Silva',
      farmName: 'Fazenda Boa Vista',
      city: 'Cidade X',
      state: 'Estado Y',
      totalArea: 100.0,
      arableArea: 70.0,
      vegetationArea: 30.0,
      crops: ['Soja', 'Milho'],
    };

    jest.spyOn(service, 'create').mockResolvedValue(createProducerDto as any);

    const result = await controller.create(createProducerDto);
    expect(result).toEqual(createProducerDto);
  });
});
