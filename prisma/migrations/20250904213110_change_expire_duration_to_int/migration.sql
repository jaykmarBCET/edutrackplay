/*
  Warnings:

  - You are about to alter the column `expireDuration` on the `CollegeFeePaymentByStudent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."CollegeFeePaymentByStudent" ALTER COLUMN "expireDuration" SET DATA TYPE INTEGER;
