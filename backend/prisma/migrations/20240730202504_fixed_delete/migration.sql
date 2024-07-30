/*
  Warnings:

  - The `deleted_at` column on the `tags` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_at` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_at` column on the `words` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `tags` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    DROP COLUMN `deleted_at`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    DROP COLUMN `deleted_at`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `words` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    DROP COLUMN `deleted_at`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL;
