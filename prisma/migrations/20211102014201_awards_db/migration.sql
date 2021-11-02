-- CreateTable
CREATE TABLE `DB_Movie` (
    `id` VARCHAR(191) NOT NULL,
    `wikiUrl` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `imdbUrl` VARCHAR(191),

    UNIQUE INDEX `DB_Movie.wikiUrl_unique`(`wikiUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DB_Person` (
    `id` VARCHAR(191) NOT NULL,
    `wikiUrl` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DB_Person.wikiUrl_unique`(`wikiUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DB_Nomination` (
    `id` VARCHAR(191) NOT NULL,
    `winner` BOOLEAN NOT NULL DEFAULT false,
    `personId` VARCHAR(191) NOT NULL,
    `movieId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DB_AwardsBody` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DB_AwardsCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DB_Award` (
    `id` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `awardsBodyId` VARCHAR(191) NOT NULL,
    `awardsCategoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DB_Nomination` ADD FOREIGN KEY (`personId`) REFERENCES `DB_Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DB_Nomination` ADD FOREIGN KEY (`movieId`) REFERENCES `DB_Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DB_Award` ADD FOREIGN KEY (`awardsBodyId`) REFERENCES `DB_AwardsBody`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DB_Award` ADD FOREIGN KEY (`awardsCategoryId`) REFERENCES `DB_AwardsCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
