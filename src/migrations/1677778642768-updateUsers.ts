import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUsers1677778642768 implements MigrationInterface {
    name = 'updateUsers1677778642768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "deletedAt" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
