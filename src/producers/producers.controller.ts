import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producersService.create(createProducerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.producersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.producersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createProducerDto: CreateProducerDto,
  ) {
    return this.producersService.update(+id, createProducerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.producersService.remove(+id);
  }
}
