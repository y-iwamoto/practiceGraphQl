import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateProduceItemToOrderDetail1745541897646
    implements MigrationInterface {
    name = 'MigrateProduceItemToOrderDetail1745541897646';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "order_detail" (
                "id" SERIAL PRIMARY KEY,
                "orderId" integer NOT NULL,
                "produceItemId" integer NOT NULL,
                "amount" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "FK_order_detail_order" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_order_detail_produce_item" FOREIGN KEY ("produceItemId") REFERENCES "produce_item"("id") ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            INSERT INTO "order_detail" ("orderId", "produceItemId", "amount", "createdAt", "updatedAt")
            SELECT "id", "produceItemId", "amount", "createdAt", "updatedAt" FROM "order" WHERE "produceItemId" IS NOT NULL;
        `);
        await queryRunner.query(
            `ALTER TABLE "order" DROP CONSTRAINT IF EXISTS "FK_order_produceItem";`,
        );
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "produceItemId";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" ADD COLUMN "produceItemId" integer;
        `);
        await queryRunner.query(`
            UPDATE "order" SET "produceItemId" = sub."produceItemId" FROM (
                SELECT DISTINCT ON ("orderId") "orderId", "produceItemId" FROM "order_detail" ORDER BY "orderId", "id"
            ) AS sub WHERE "order"."id" = sub."id";
        `);
        await queryRunner.query(`
            ALTER TABLE "order" ADD CONSTRAINT "FK_order_produceItem" FOREIGN KEY ("produceItemId") REFERENCES "produce_item"("id") ON DELETE CASCADE;
        `);
        await queryRunner.query(`
            DROP TABLE IF EXISTS "order_detail";
        `);
    }
}
