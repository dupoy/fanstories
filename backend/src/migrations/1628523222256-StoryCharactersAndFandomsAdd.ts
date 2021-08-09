import {MigrationInterface, QueryRunner} from "typeorm";

export class StoryCharactersAndFandomsAdd1628523222256 implements MigrationInterface {
    name = 'StoryCharactersAndFandomsAdd1628523222256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stories_fandoms_fandoms" ("storiesId" integer NOT NULL, "fandomsId" integer NOT NULL, CONSTRAINT "PK_21bcadfab10a51e85027974826b" PRIMARY KEY ("storiesId", "fandomsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c517b4c44a8afc73521c1ecba" ON "stories_fandoms_fandoms" ("storiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ada2e67d3dfbd38552607a6848" ON "stories_fandoms_fandoms" ("fandomsId") `);
        await queryRunner.query(`CREATE TABLE "stories_characters_characters" ("storiesId" integer NOT NULL, "charactersId" integer NOT NULL, CONSTRAINT "PK_a4479c9eb67edf11db6f77e27c5" PRIMARY KEY ("storiesId", "charactersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6bfb10f30b7bcde0ad94c5c3ec" ON "stories_characters_characters" ("storiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_518c65241a277ee6b91e7a7596" ON "stories_characters_characters" ("charactersId") `);
        await queryRunner.query(`ALTER TABLE "stories_fandoms_fandoms" ADD CONSTRAINT "FK_3c517b4c44a8afc73521c1ecba6" FOREIGN KEY ("storiesId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_fandoms_fandoms" ADD CONSTRAINT "FK_ada2e67d3dfbd38552607a68485" FOREIGN KEY ("fandomsId") REFERENCES "fandoms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_characters_characters" ADD CONSTRAINT "FK_6bfb10f30b7bcde0ad94c5c3ec6" FOREIGN KEY ("storiesId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_characters_characters" ADD CONSTRAINT "FK_518c65241a277ee6b91e7a7596b" FOREIGN KEY ("charactersId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stories_characters_characters" DROP CONSTRAINT "FK_518c65241a277ee6b91e7a7596b"`);
        await queryRunner.query(`ALTER TABLE "stories_characters_characters" DROP CONSTRAINT "FK_6bfb10f30b7bcde0ad94c5c3ec6"`);
        await queryRunner.query(`ALTER TABLE "stories_fandoms_fandoms" DROP CONSTRAINT "FK_ada2e67d3dfbd38552607a68485"`);
        await queryRunner.query(`ALTER TABLE "stories_fandoms_fandoms" DROP CONSTRAINT "FK_3c517b4c44a8afc73521c1ecba6"`);
        await queryRunner.query(`DROP INDEX "IDX_518c65241a277ee6b91e7a7596"`);
        await queryRunner.query(`DROP INDEX "IDX_6bfb10f30b7bcde0ad94c5c3ec"`);
        await queryRunner.query(`DROP TABLE "stories_characters_characters"`);
        await queryRunner.query(`DROP INDEX "IDX_ada2e67d3dfbd38552607a6848"`);
        await queryRunner.query(`DROP INDEX "IDX_3c517b4c44a8afc73521c1ecba"`);
        await queryRunner.query(`DROP TABLE "stories_fandoms_fandoms"`);
    }

}
