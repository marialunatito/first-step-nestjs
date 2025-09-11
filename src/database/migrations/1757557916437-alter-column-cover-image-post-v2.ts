import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnCoverImagePostV21757557916437 implements MigrationInterface {
  name = 'AlterColumnCoverImagePostV21757557916437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" type VARCHAR(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" type VARCHAR(801)`);
  }
}
