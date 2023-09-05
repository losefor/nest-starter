/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_name_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_permissionId_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Translation";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "email" TEXT,
    "permissionId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "unique_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "Image" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "width" INTEGER,
    "hight" INTEGER,
    "size_in_bytes" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translations" (
    "id" TEXT NOT NULL,
    "ar" TEXT,
    "en" TEXT,
    "ckb" TEXT,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_unique_name_key" ON "permissions"("unique_name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_name_id_fkey" FOREIGN KEY ("name_id") REFERENCES "translations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
