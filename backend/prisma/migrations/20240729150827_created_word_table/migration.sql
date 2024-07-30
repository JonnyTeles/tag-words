-- CreateTable
CREATE TABLE `words` (
    `id` VARCHAR(191) NOT NULL,
    `word` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `words_id_key`(`id`),
    UNIQUE INDEX `words_word_key`(`word`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
