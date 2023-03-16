<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230316093412 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE city (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, comment_id INT DEFAULT NULL, fk_user_id INT NOT NULL, fk_itinerary_id INT NOT NULL, text LONGTEXT NOT NULL, INDEX IDX_9474526CF8697D13 (comment_id), INDEX IDX_9474526C5741EEB9 (fk_user_id), INDEX IDX_9474526C342A35AB (fk_itinerary_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE itinerary (id INT AUTO_INCREMENT NOT NULL, fk_user_id INT DEFAULT NULL, fk_city_id INT NOT NULL, name VARCHAR(255) NOT NULL, price INT DEFAULT NULL, distance VARCHAR(255) DEFAULT NULL, INDEX IDX_FF2238F65741EEB9 (fk_user_id), INDEX IDX_FF2238F67B835F83 (fk_city_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `like` (id INT AUTO_INCREMENT NOT NULL, fk_itinerary_id INT DEFAULT NULL, fk_user_id INT DEFAULT NULL, rate SMALLINT DEFAULT NULL, favorite TINYINT(1) DEFAULT NULL, INDEX IDX_AC6340B3342A35AB (fk_itinerary_id), INDEX IDX_AC6340B35741EEB9 (fk_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, pseudo VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, register_date DATE NOT NULL, url_pp VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CF8697D13 FOREIGN KEY (comment_id) REFERENCES comment (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C5741EEB9 FOREIGN KEY (fk_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C342A35AB FOREIGN KEY (fk_itinerary_id) REFERENCES itinerary (id)');
        $this->addSql('ALTER TABLE itinerary ADD CONSTRAINT FK_FF2238F65741EEB9 FOREIGN KEY (fk_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE itinerary ADD CONSTRAINT FK_FF2238F67B835F83 FOREIGN KEY (fk_city_id) REFERENCES city (id)');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B3342A35AB FOREIGN KEY (fk_itinerary_id) REFERENCES itinerary (id)');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B35741EEB9 FOREIGN KEY (fk_user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CF8697D13');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C5741EEB9');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C342A35AB');
        $this->addSql('ALTER TABLE itinerary DROP FOREIGN KEY FK_FF2238F65741EEB9');
        $this->addSql('ALTER TABLE itinerary DROP FOREIGN KEY FK_FF2238F67B835F83');
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B3342A35AB');
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B35741EEB9');
        $this->addSql('DROP TABLE city');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE itinerary');
        $this->addSql('DROP TABLE `like`');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
