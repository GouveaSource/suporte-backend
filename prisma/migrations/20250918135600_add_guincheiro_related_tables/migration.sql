-- CreateTable
CREATE TABLE "public"."Reboque" (
    "id" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reboque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orgaosApreensao" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cidadeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orgaosApreensao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CidadeToPatio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CidadeToPatio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reboque_placa_key" ON "public"."Reboque"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_nome_estado_key" ON "public"."Cidade"("nome", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "orgaosApreensao_name_key" ON "public"."orgaosApreensao"("name");

-- CreateIndex
CREATE INDEX "_CidadeToPatio_B_index" ON "public"."_CidadeToPatio"("B");

-- AddForeignKey
ALTER TABLE "public"."Reboque" ADD CONSTRAINT "Reboque_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orgaosApreensao" ADD CONSTRAINT "orgaosApreensao_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "public"."Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CidadeToPatio" ADD CONSTRAINT "_CidadeToPatio_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Cidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CidadeToPatio" ADD CONSTRAINT "_CidadeToPatio_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Patio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
