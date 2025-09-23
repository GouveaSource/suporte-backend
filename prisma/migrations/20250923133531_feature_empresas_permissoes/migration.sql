/*
  Warnings:

  - You are about to drop the column `ano` on the `Reboque` table. All the data in the column will be lost.
  - You are about to drop the column `marca` on the `Reboque` table. All the data in the column will be lost.
  - You are about to drop the column `modelo` on the `Reboque` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_DriverToPatio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orgaosApreensao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `empresaId` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marcaModelo` to the `Reboque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Reboque` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TipoReboque" AS ENUM ('LEVE', 'PESADO');

-- DropForeignKey
ALTER TABLE "public"."_DriverToPatio" DROP CONSTRAINT "_DriverToPatio_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_DriverToPatio" DROP CONSTRAINT "_DriverToPatio_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."orgaosApreensao" DROP CONSTRAINT "orgaosApreensao_cidadeId_fkey";

-- AlterTable
ALTER TABLE "public"."Driver" ADD COLUMN     "empresaId" TEXT NOT NULL,
ADD COLUMN     "patioId" TEXT;

-- AlterTable
ALTER TABLE "public"."Reboque" DROP COLUMN "ano",
DROP COLUMN "marca",
DROP COLUMN "modelo",
ADD COLUMN     "marcaModelo" TEXT NOT NULL,
ADD COLUMN     "tipo" "public"."TipoReboque" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "role";

-- DropTable
DROP TABLE "public"."_DriverToPatio";

-- DropTable
DROP TABLE "public"."orgaosApreensao";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "public"."Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Empresa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrgaosApreensao" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cidadeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgaosApreensao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PermissionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermissionToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_OrgaosApreensaoToPatio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrgaosApreensaoToPatio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "public"."Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_name_key" ON "public"."Empresa"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OrgaosApreensao_name_key" ON "public"."OrgaosApreensao"("name");

-- CreateIndex
CREATE INDEX "_PermissionToUser_B_index" ON "public"."_PermissionToUser"("B");

-- CreateIndex
CREATE INDEX "_OrgaosApreensaoToPatio_B_index" ON "public"."_OrgaosApreensaoToPatio"("B");

-- AddForeignKey
ALTER TABLE "public"."Driver" ADD CONSTRAINT "Driver_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "public"."Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Driver" ADD CONSTRAINT "Driver_patioId_fkey" FOREIGN KEY ("patioId") REFERENCES "public"."Patio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrgaosApreensao" ADD CONSTRAINT "OrgaosApreensao_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "public"."Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrgaosApreensaoToPatio" ADD CONSTRAINT "_OrgaosApreensaoToPatio_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."OrgaosApreensao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrgaosApreensaoToPatio" ADD CONSTRAINT "_OrgaosApreensaoToPatio_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Patio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
