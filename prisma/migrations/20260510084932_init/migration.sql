-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NULL;

-- CreateIndex (only if not exists)
CREATE INDEX IF NOT EXISTS `account_userId_idx` ON `account`(`userId`(191));

-- CreateIndex
CREATE INDEX IF NOT EXISTS `session_userId_idx` ON `session`(`userId`(191));