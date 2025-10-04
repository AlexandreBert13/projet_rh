/*
  Warnings:

  - Added the required column `companyId` to the `Computer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `computer` ADD COLUMN `companyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Computer` ADD CONSTRAINT `Computer_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
