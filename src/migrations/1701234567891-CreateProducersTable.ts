import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducersTable1701234567891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'producers',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'cpf_or_cnpj',
            type: 'varchar',
            length: '20',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'farm_name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'state',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'total_area',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'arable_area',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'vegetation_area',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'crops',
            type: 'text[]',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('producers');
  }
}
