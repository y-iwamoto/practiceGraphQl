import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744688488678 implements MigrationInterface {
    name = 'Init1744688488678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "farm" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "farm" DROP COLUMN "createdAt"`);
    }

}
