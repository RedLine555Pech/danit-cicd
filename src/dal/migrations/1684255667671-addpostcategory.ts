import { MigrationInterface, QueryRunner } from "typeorm";

export class Addpostcategory1684255667671 implements MigrationInterface {
    name = 'Addpostcategory1684255667671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_60fc2bf4245759a0671aee7730" ON "post" ("category") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_60fc2bf4245759a0671aee7730"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "category"`);
    }

}
