<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230320091003 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C5741EEB9');
        $this->addSql('ALTER TABLE itinerary DROP FOREIGN KEY FK_FF2238F65741EEB9');
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B35741EEB9');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP INDEX IDX_9474526C5741EEB9 ON comment');
        $this->addSql('ALTER TABLE comment DROP fk_user_id');
        $this->addSql('DROP INDEX IDX_FF2238F65741EEB9 ON itinerary');
        $this->addSql('ALTER TABLE itinerary DROP fk_user_id');
        $this->addSql('DROP INDEX IDX_AC6340B35741EEB9 ON `like`');
        $this->addSql('ALTER TABLE `like` DROP fk_user_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, pseudo VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, register_date DATE NOT NULL, url_pp VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE comment ADD fk_user_id INT NOT NULL');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C5741EEB9 FOREIGN KEY (fk_user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_9474526C5741EEB9 ON comment (fk_user_id)');
        $this->addSql('ALTER TABLE itinerary ADD fk_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE itinerary ADD CONSTRAINT FK_FF2238F65741EEB9 FOREIGN KEY (fk_user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_FF2238F65741EEB9 ON itinerary (fk_user_id)');
        $this->addSql('ALTER TABLE `like` ADD fk_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B35741EEB9 FOREIGN KEY (fk_user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_AC6340B35741EEB9 ON `like` (fk_user_id)');
    }
}
