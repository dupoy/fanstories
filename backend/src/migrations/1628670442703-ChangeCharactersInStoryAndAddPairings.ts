import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCharactersInStoryAndAddPairings1628670442703 implements MigrationInterface {
    name = 'ChangeCharactersInStoryAndAddPairings1628670442703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "characters" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "fandomId" integer, CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fandoms" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_bfd9c6b6116a9b84cacd1e09d33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "stories_rating_enum" AS ENUM('G', 'PG-13', 'R', 'NC-17', 'NC-21')`);
        await queryRunner.query(`CREATE TYPE "stories_focus_enum" AS ENUM('Jen', 'Get', 'Slash', 'Femslash', 'Other', 'Article')`);
        await queryRunner.query(`CREATE TYPE "stories_status_enum" AS ENUM('In progress', 'Completed', 'Abandoned')`);
        await queryRunner.query(`CREATE TABLE "stories" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "words" integer NOT NULL DEFAULT '0', "rating" "stories_rating_enum" NOT NULL, "focus" "stories_focus_enum" NOT NULL, "status" "stories_status_enum" NOT NULL, "favoriteCount" integer NOT NULL, "followCount" integer NOT NULL, "characters" text NOT NULL, "pairings" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_bb6f880b260ed96c452b32a39f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chapters" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "words" integer NOT NULL DEFAULT '0', "storyId" integer, CONSTRAINT "PK_a2bbdbb4bdc786fe0cb0fcfc4a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_follow_authors_users" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_8323fbfb2b574b683371fc553e5" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5de6ce1c4b87ab58d991e538ae" ON "users_follow_authors_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4af1c6afbfd100fe60a2f3c101" ON "users_follow_authors_users" ("usersId_2") `);
        await queryRunner.query(`CREATE TABLE "users_follow_stories_stories" ("usersId" integer NOT NULL, "storiesId" integer NOT NULL, CONSTRAINT "PK_e0df0d49870f1ce27a932440e3c" PRIMARY KEY ("usersId", "storiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_086b4e803a5d89d10a835d0a4e" ON "users_follow_stories_stories" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_63ed788235d319e973edb35c9f" ON "users_follow_stories_stories" ("storiesId") `);
        await queryRunner.query(`CREATE TABLE "users_favorite_stories_stories" ("usersId" integer NOT NULL, "storiesId" integer NOT NULL, CONSTRAINT "PK_fb543c0523be0dd0622a5c6c297" PRIMARY KEY ("usersId", "storiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1d38d9dd76452ba74e21675ee3" ON "users_favorite_stories_stories" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7ce8e7a70b79ad11c4913a722" ON "users_favorite_stories_stories" ("storiesId") `);
        await queryRunner.query(`CREATE TABLE "stories_fandoms_fandoms" ("storiesId" integer NOT NULL, "fandomsId" integer NOT NULL, CONSTRAINT "PK_21bcadfab10a51e85027974826b" PRIMARY KEY ("storiesId", "fandomsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c517b4c44a8afc73521c1ecba" ON "stories_fandoms_fandoms" ("storiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ada2e67d3dfbd38552607a6848" ON "stories_fandoms_fandoms" ("fandomsId") `);
        await queryRunner.query(`CREATE TABLE "stories_tags_tags" ("storiesId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_04726b6dd1ff42df142009bb61b" PRIMARY KEY ("storiesId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_55040b40402b9afc4e9d3f8c78" ON "stories_tags_tags" ("storiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_051de18d57618d3ed057b736d2" ON "stories_tags_tags" ("tagsId") `);
        await queryRunner.query(`CREATE TABLE "stories_betas_users" ("storiesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_0458c2a68b7d346ec8bca59b87d" PRIMARY KEY ("storiesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22ef4881d7d290eec4031efa51" ON "stories_betas_users" ("storiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9cc3fb506c0960afe31eb0457d" ON "stories_betas_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_88918b5da01d96a7aa81f69b51d" FOREIGN KEY ("fandomId") REFERENCES "fandoms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stories" ADD CONSTRAINT "FK_e36e259ea3b3799645774194033" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapters" ADD CONSTRAINT "FK_2720e441e621b26246278c0ea4c" FOREIGN KEY ("storyId") REFERENCES "stories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_follow_authors_users" ADD CONSTRAINT "FK_5de6ce1c4b87ab58d991e538ae7" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_follow_authors_users" ADD CONSTRAINT "FK_4af1c6afbfd100fe60a2f3c101d" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_follow_stories_stories" ADD CONSTRAINT "FK_086b4e803a5d89d10a835d0a4e8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_follow_stories_stories" ADD CONSTRAINT "FK_63ed788235d319e973edb35c9f3" FOREIGN KEY ("storiesId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorite_stories_stories" ADD CONSTRAINT "FK_1d38d9dd76452ba74e21675ee36" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorite_stories_stories" ADD CONSTRAINT "FK_c7ce8e7a70b79ad11c4913a7220" FOREIGN KEY ("storiesId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_fandoms_fandoms" ADD CONSTRAINT "FK_3c517b4c44a8afc73521c1ecba6" FOREIGN KEY ("storiesId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_fandoms_fandoms" ADD CONSTRAINT "FK_ada2e67d3dfbd38552607a68485" FOREIGN KEY ("fandomsId") REFERENCES "fandoms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_tags_tags" ADD CONSTRAINT "FK_55040b40402b9afc4e9d3f8c78a" FOREIGN KEY ("storiesId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_tags_tags" ADD CONSTRAINT "FK_051de18d57618d3ed057b736d2b" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_betas_users" ADD CONSTRAINT "FK_22ef4881d7d290eec4031efa51e" FOREIGN KEY ("storiesId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stories_betas_users" ADD CONSTRAINT "FK_9cc3fb506c0960afe31eb0457da" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stories_betas_users" DROP CONSTRAINT "FK_9cc3fb506c0960afe31eb0457da"`);
        await queryRunner.query(`ALTER TABLE "stories_betas_users" DROP CONSTRAINT "FK_22ef4881d7d290eec4031efa51e"`);
        await queryRunner.query(`ALTER TABLE "stories_tags_tags" DROP CONSTRAINT "FK_051de18d57618d3ed057b736d2b"`);
        await queryRunner.query(`ALTER TABLE "stories_tags_tags" DROP CONSTRAINT "FK_55040b40402b9afc4e9d3f8c78a"`);
        await queryRunner.query(`ALTER TABLE "stories_fandoms_fandoms" DROP CONSTRAINT "FK_ada2e67d3dfbd38552607a68485"`);
        await queryRunner.query(`ALTER TABLE "stories_fandoms_fandoms" DROP CONSTRAINT "FK_3c517b4c44a8afc73521c1ecba6"`);
        await queryRunner.query(`ALTER TABLE "users_favorite_stories_stories" DROP CONSTRAINT "FK_c7ce8e7a70b79ad11c4913a7220"`);
        await queryRunner.query(`ALTER TABLE "users_favorite_stories_stories" DROP CONSTRAINT "FK_1d38d9dd76452ba74e21675ee36"`);
        await queryRunner.query(`ALTER TABLE "users_follow_stories_stories" DROP CONSTRAINT "FK_63ed788235d319e973edb35c9f3"`);
        await queryRunner.query(`ALTER TABLE "users_follow_stories_stories" DROP CONSTRAINT "FK_086b4e803a5d89d10a835d0a4e8"`);
        await queryRunner.query(`ALTER TABLE "users_follow_authors_users" DROP CONSTRAINT "FK_4af1c6afbfd100fe60a2f3c101d"`);
        await queryRunner.query(`ALTER TABLE "users_follow_authors_users" DROP CONSTRAINT "FK_5de6ce1c4b87ab58d991e538ae7"`);
        await queryRunner.query(`ALTER TABLE "chapters" DROP CONSTRAINT "FK_2720e441e621b26246278c0ea4c"`);
        await queryRunner.query(`ALTER TABLE "stories" DROP CONSTRAINT "FK_e36e259ea3b3799645774194033"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_88918b5da01d96a7aa81f69b51d"`);
        await queryRunner.query(`DROP INDEX "IDX_9cc3fb506c0960afe31eb0457d"`);
        await queryRunner.query(`DROP INDEX "IDX_22ef4881d7d290eec4031efa51"`);
        await queryRunner.query(`DROP TABLE "stories_betas_users"`);
        await queryRunner.query(`DROP INDEX "IDX_051de18d57618d3ed057b736d2"`);
        await queryRunner.query(`DROP INDEX "IDX_55040b40402b9afc4e9d3f8c78"`);
        await queryRunner.query(`DROP TABLE "stories_tags_tags"`);
        await queryRunner.query(`DROP INDEX "IDX_ada2e67d3dfbd38552607a6848"`);
        await queryRunner.query(`DROP INDEX "IDX_3c517b4c44a8afc73521c1ecba"`);
        await queryRunner.query(`DROP TABLE "stories_fandoms_fandoms"`);
        await queryRunner.query(`DROP INDEX "IDX_c7ce8e7a70b79ad11c4913a722"`);
        await queryRunner.query(`DROP INDEX "IDX_1d38d9dd76452ba74e21675ee3"`);
        await queryRunner.query(`DROP TABLE "users_favorite_stories_stories"`);
        await queryRunner.query(`DROP INDEX "IDX_63ed788235d319e973edb35c9f"`);
        await queryRunner.query(`DROP INDEX "IDX_086b4e803a5d89d10a835d0a4e"`);
        await queryRunner.query(`DROP TABLE "users_follow_stories_stories"`);
        await queryRunner.query(`DROP INDEX "IDX_4af1c6afbfd100fe60a2f3c101"`);
        await queryRunner.query(`DROP INDEX "IDX_5de6ce1c4b87ab58d991e538ae"`);
        await queryRunner.query(`DROP TABLE "users_follow_authors_users"`);
        await queryRunner.query(`DROP TABLE "chapters"`);
        await queryRunner.query(`DROP TABLE "stories"`);
        await queryRunner.query(`DROP TYPE "stories_status_enum"`);
        await queryRunner.query(`DROP TYPE "stories_focus_enum"`);
        await queryRunner.query(`DROP TYPE "stories_rating_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "fandoms"`);
        await queryRunner.query(`DROP TABLE "characters"`);
    }

}
