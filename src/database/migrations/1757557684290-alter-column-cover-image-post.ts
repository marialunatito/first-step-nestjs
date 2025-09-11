import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnCoverImagePost1757557684290 implements MigrationInterface {
  name = 'AlterColumnCoverImagePost1757557684290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" type VARCHAR(801)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" type VARCHAR(800)`);
  }
}
