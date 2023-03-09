import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserTable1677762532519 implements MigrationInterface {
    name = 'alterUserTable1677762532519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "admin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "admin" DROP DEFAULT`);
    }

}
