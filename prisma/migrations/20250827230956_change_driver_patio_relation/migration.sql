-- CreateTable
CREATE TABLE "public"."Patio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "referencePoint" TEXT,
    "mapUrl" TEXT,
    "phone" TEXT,
    "ramal" TEXT,
    "managerName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_DriverToPatio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DriverToPatio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patio_name_key" ON "public"."Patio"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_cpf_key" ON "public"."Driver"("cpf");

-- CreateIndex
CREATE INDEX "_DriverToPatio_B_index" ON "public"."_DriverToPatio"("B");

-- AddForeignKey
ALTER TABLE "public"."_DriverToPatio" ADD CONSTRAINT "_DriverToPatio_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DriverToPatio" ADD CONSTRAINT "_DriverToPatio_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Patio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
