import {MigrationInterface, QueryRunner} from "typeorm";

export class NewFields1628918364545 implements MigrationInterface {
    name = 'NewFields1628918364545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stories" ADD "pages" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "public"."stories" ADD "viewCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "public"."chapters" ADD "viewCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."chapters" DROP COLUMN "viewCount"`);
        await queryRunner.query(`ALTER TABLE "public"."stories" DROP COLUMN "viewCount"`);
        await queryRunner.query(`ALTER TABLE "public"."stories" DROP COLUMN "pages"`);
    }

}
