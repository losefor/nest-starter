/*
  Warnings:

  - You are about to drop the column `arName` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `ckbName` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `enName` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `Permission` table. All the data in the column will be lost.
  - Added the required column `name_id` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_nameId_fkey";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "arName",
DROP COLUMN "ckbName",
DROP COLUMN "enName",
DROP COLUMN "nameId",
ADD COLUMN     "name_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_name_id_fkey" FOREIGN KEY ("name_id") REFERENCES "Translation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
