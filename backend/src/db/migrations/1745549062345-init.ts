import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745549062345 implements MigrationInterface {
    name = 'Init1745549062345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_order_detail_order"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_order_detail_produce_item"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_36f0e43258f112c605a43075933" FOREIGN KEY ("produceItemId") REFERENCES "produce_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_36f0e43258f112c605a43075933"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_order_detail_produce_item" FOREIGN KEY ("produceItemId") REFERENCES "produce_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_order_detail_order" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
