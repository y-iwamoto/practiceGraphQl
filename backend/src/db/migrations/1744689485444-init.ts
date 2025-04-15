import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744689485444 implements MigrationInterface {
    name = 'Init1744689485444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_d5f70ea0d7ab61a43bc2a7ce1a" ON "farm" ("ownerId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d5f70ea0d7ab61a43bc2a7ce1a"`);
    }

}
