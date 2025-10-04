-- DropForeignKey
ALTER TABLE `computer` DROP FOREIGN KEY `Computer_employeeId_fkey`;

-- DropIndex
DROP INDEX `Computer_employeeId_fkey` ON `computer`;

-- AlterTable
ALTER TABLE `computer` MODIFY `employeeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Computer` ADD CONSTRAINT `Computer_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
