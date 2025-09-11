import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnPasswordUsers1757559403180 implements MigrationInterface {
  name = 'AlterColumnPasswordUsers1757559403180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" type character varying(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" type character varying(32)`);
  }
}
