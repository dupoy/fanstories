import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimestampToChapterAndNumber1628830142201
  implements MigrationInterface
{
  name = 'TimestampToChapterAndNumber1628830142201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."chapters" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."chapters" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."chapters" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."chapters" DROP COLUMN "createdAt"`,
    );
  }
}
