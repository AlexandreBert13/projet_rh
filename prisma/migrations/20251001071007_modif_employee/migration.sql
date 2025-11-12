/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Company_name_key` ON `Company`;

-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `age` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_mail_key` ON `Employee`(`mail`);
