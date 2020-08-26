import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1598454071593 implements MigrationInterface {
  name = 'init1598454071593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `talks` (`talk_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `channel` varchar(128) NOT NULL COMMENT 'グループの識別子', `name` varchar(128) NOT NULL COMMENT 'ユーザーの名前', `message` varchar(1024) NOT NULL COMMENT 'チャットのメッセージ', `time` float UNSIGNED NOT NULL COMMENT '投稿時間', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`talk_id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      'CREATE TABLE `hogehoge`.`query-result-cache` (`id` int NOT NULL AUTO_INCREMENT, `identifier` varchar(255) NULL, `time` bigint NOT NULL, `duration` int NOT NULL, `query` text NOT NULL, `result` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `hogehoge`.`query-result-cache`');
    await queryRunner.query('DROP TABLE `talks`');
  }
}
