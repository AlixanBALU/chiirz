<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230320105308 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `like` ADD fk_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B35741EEB9 FOREIGN KEY (fk_user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_AC6340B35741EEB9 ON `like` (fk_user_id)');
        $this->addSql('ALTER TABLE user ADD fk_city_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6497B835F83 FOREIGN KEY (fk_city_id) REFERENCES city (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6497B835F83 ON user (fk_city_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B35741EEB9');
        $this->addSql('DROP INDEX IDX_AC6340B35741EEB9 ON `like`');
        $this->addSql('ALTER TABLE `like` DROP fk_user_id');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6497B835F83');
        $this->addSql('DROP INDEX IDX_8D93D6497B835F83 ON user');
        $this->addSql('ALTER TABLE user DROP fk_city_id');
    }
}
