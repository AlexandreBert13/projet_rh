/*
  Warnings:

  - A unique constraint covering the columns `[macAddress]` on the table `Computer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Computer_macAddress_key` ON `Computer`(`macAddress`);
