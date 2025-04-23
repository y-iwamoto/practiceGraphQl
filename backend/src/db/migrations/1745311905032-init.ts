import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745311905032 implements MigrationInterface {
    name = 'Init1745311905032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."shipment_status_enum" AS ENUM('PENDING', 'SHIPPED', 'DELIVERED')`);
        await queryRunner.query(`CREATE TABLE "shipment" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "shippedAt" TIMESTAMP WITH TIME ZONE, "deliveredAt" TIMESTAMP WITH TIME ZONE, "estimatedDeliveryDate" date, "status" "public"."shipment_status_enum" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_93ba0beada3eb709bc83dc0b9a" UNIQUE ("orderId"), CONSTRAINT "PK_f51f635db95c534ca206bf7a0a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD "shipmentId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_b706d170f54c48fbcd315a9eaf3" UNIQUE ("shipmentId")`);
        await queryRunner.query(`ALTER TABLE "shipment" ADD CONSTRAINT "FK_93ba0beada3eb709bc83dc0b9af" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_b706d170f54c48fbcd315a9eaf3" FOREIGN KEY ("shipmentId") REFERENCES "shipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_b706d170f54c48fbcd315a9eaf3"`);
        await queryRunner.query(`ALTER TABLE "shipment" DROP CONSTRAINT "FK_93ba0beada3eb709bc83dc0b9af"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_b706d170f54c48fbcd315a9eaf3"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shipmentId"`);
        await queryRunner.query(`DROP TABLE "shipment"`);
        await queryRunner.query(`DROP TYPE "public"."shipment_status_enum"`);
    }

}
