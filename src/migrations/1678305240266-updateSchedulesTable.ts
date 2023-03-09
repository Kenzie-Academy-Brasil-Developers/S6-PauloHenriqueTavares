import { MigrationInterface, QueryRunner } from "typeorm";

export class updateSchedulesTable1678305240266 implements MigrationInterface {
    name = 'updateSchedulesTable1678305240266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RealEstate" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "RealEstate" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "RealEstate" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "RealEstate" ADD "updatedAt" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RealEstate" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "RealEstate" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "RealEstate" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "RealEstate" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
