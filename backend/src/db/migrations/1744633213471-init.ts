import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744633213471 implements MigrationInterface {
    name = 'Init1744633213471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "farm" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "postalCode" character varying NOT NULL, "prefecture" character varying NOT NULL, "city" character varying NOT NULL, "restAddress" character varying NOT NULL, "building" character varying NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "REL_d5f70ea0d7ab61a43bc2a7ce1a" UNIQUE ("ownerId"), CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "farm" ADD CONSTRAINT "FK_d5f70ea0d7ab61a43bc2a7ce1a6" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm" DROP CONSTRAINT "FK_d5f70ea0d7ab61a43bc2a7ce1a6"`);
        await queryRunner.query(`DROP TABLE "farm"`);
    }

}
