/*
  Warnings:

  - A unique constraint covering the columns `[individual_tax_number]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_individual_tax_number_key" ON "Customer"("individual_tax_number");
