import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745203876848 implements MigrationInterface {
    name = 'Init1745203876848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "buyerId" integer NOT NULL, "farmId" integer NOT NULL, "produceItemId" integer NOT NULL, "orderedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_20981b2b68bf03393c44dd1b9d7" FOREIGN KEY ("buyerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_00d4c9d738d961431c05405f5ad" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_ccce7007a41fc70eccb831d3ee4" FOREIGN KEY ("produceItemId") REFERENCES "produce_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_ccce7007a41fc70eccb831d3ee4"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_00d4c9d738d961431c05405f5ad"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_20981b2b68bf03393c44dd1b9d7"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
