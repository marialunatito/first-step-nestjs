import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsCategoriesChangeColumnPost1757557203741 implements MigrationInterface {
  name = 'AddFieldsCategoriesChangeColumnPost1757557203741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(800)`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "cover_image" character varying(800)`);
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" type VARCHAR(801)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "cover_image"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "cover_image" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" type VARCHAR(800)`);
  }
}
