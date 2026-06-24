/*
  Warnings:

  - Added the required column `previousClose` to the `Share` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "previousClose" DECIMAL(12,2) NOT NULL;
