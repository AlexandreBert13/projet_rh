/*
  Warnings:

  - Added the required column `employeeId` to the `Computer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Computer` ADD COLUMN `employeeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Computer` ADD CONSTRAINT `Computer_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
