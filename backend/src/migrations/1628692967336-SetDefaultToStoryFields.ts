import {MigrationInterface, QueryRunner} from "typeorm";

export class SetDefaultToStoryFields1628692967336 implements MigrationInterface {
    name = 'SetDefaultToStoryFields1628692967336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stories" ALTER COLUMN "status" SET DEFAULT 'In progress'`);
        await queryRunner.query(`ALTER TABLE "public"."stories" ALTER COLUMN "favoriteCount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "public"."stories" ALTER COLUMN "followCount" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stories" ALTER COLUMN "followCount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."stories" ALTER COLUMN "favoriteCount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."stories" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
