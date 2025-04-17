import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744880297247 implements MigrationInterface {
    name = 'Init1744880297247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produce_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "farmId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7f0406b4fc7c96c6de698672466" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produce_item" ADD CONSTRAINT "FK_72f3fc43d5d3d4d215efde3d9fb" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produce_item" DROP CONSTRAINT "FK_72f3fc43d5d3d4d215efde3d9fb"`);
        await queryRunner.query(`DROP TABLE "produce_item"`);
    }

}
