export class CreateProducerDto {
  cpfOrCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: string[];
}
