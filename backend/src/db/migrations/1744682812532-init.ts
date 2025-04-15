import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744682812532 implements MigrationInterface {
    name = 'Init1744682812532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm" DROP CONSTRAINT "FK_d5f70ea0d7ab61a43bc2a7ce1a6"`);
        await queryRunner.query(`ALTER TABLE "farm" ALTER COLUMN "building" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farm" DROP CONSTRAINT "REL_d5f70ea0d7ab61a43bc2a7ce1a"`);
        await queryRunner.query(`ALTER TABLE "farm" ADD CONSTRAINT "FK_d5f70ea0d7ab61a43bc2a7ce1a6" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm" DROP CONSTRAINT "FK_d5f70ea0d7ab61a43bc2a7ce1a6"`);
        await queryRunner.query(`ALTER TABLE "farm" ADD CONSTRAINT "REL_d5f70ea0d7ab61a43bc2a7ce1a" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "farm" ALTER COLUMN "building" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farm" ADD CONSTRAINT "FK_d5f70ea0d7ab61a43bc2a7ce1a6" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
