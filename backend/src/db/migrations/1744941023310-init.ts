import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744941023310 implements MigrationInterface {
    name = 'Init1744941023310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produce_stock" ("id" SERIAL NOT NULL, "amount" integer NOT NULL DEFAULT '0', "farmId" integer NOT NULL, "produceItemId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_2a283c0b72e6c55ddaaaf0ccfe" UNIQUE ("produceItemId"), CONSTRAINT "PK_0f7dd6b4c75cc15020502a530d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produce_stock" ADD CONSTRAINT "FK_25048a12833fc783247dbe03477" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produce_stock" ADD CONSTRAINT "FK_2a283c0b72e6c55ddaaaf0ccfec" FOREIGN KEY ("produceItemId") REFERENCES "produce_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produce_stock" DROP CONSTRAINT "FK_2a283c0b72e6c55ddaaaf0ccfec"`);
        await queryRunner.query(`ALTER TABLE "produce_stock" DROP CONSTRAINT "FK_25048a12833fc783247dbe03477"`);
        await queryRunner.query(`DROP TABLE "produce_stock"`);
    }

}
