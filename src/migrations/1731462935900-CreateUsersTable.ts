import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1731462935900 implements MigrationInterface {
    name = 'CreateUsersTable1731462935900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producer" ("id" SERIAL NOT NULL, "cpfOrCnpj" character varying NOT NULL, "name" character varying NOT NULL, "farmName" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" numeric NOT NULL, "arableArea" numeric NOT NULL, "vegetationArea" numeric NOT NULL, "crops" text NOT NULL, CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "producer"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
