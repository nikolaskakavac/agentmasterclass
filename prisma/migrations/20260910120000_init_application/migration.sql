-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."Program" AS ENUM ('BEGINNER', 'SALES_SKILLS', 'UNSURE');

-- CreateEnum
CREATE TYPE "public"."Experience" AS ENUM ('NONE', 'UNDER_SIX_MONTHS', 'SIX_TO_TWELVE_MONTHS', 'ONE_TO_THREE_YEARS', 'OVER_THREE_YEARS');

-- CreateEnum
CREATE TYPE "public"."ApplicantType" AS ENUM ('INDIVIDUAL', 'TEAM');

-- CreateEnum
CREATE TYPE "public"."TeamSize" AS ENUM ('TWO_TO_THREE', 'FOUR_PLUS');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('UNSELECTED', 'CARD', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('NOT_STARTED', 'PENDING', 'PAID', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."Application" (
    "id" TEXT NOT NULL,
    "clientRequestId" UUID NOT NULL,
    "fullName" VARCHAR(120) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "phone" VARCHAR(40) NOT NULL,
    "program" "public"."Program" NOT NULL,
    "experience" "public"."Experience" NOT NULL,
    "challenge" VARCHAR(1500),
    "applicantType" "public"."ApplicantType" NOT NULL,
    "teamSize" "public"."TeamSize",
    "consentAt" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "public"."PaymentMethod" NOT NULL DEFAULT 'UNSELECTED',
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "paymentReference" VARCHAR(191),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_clientRequestId_key" ON "public"."Application"("clientRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_paymentReference_key" ON "public"."Application"("paymentReference");

-- CreateIndex
CREATE INDEX "Application_program_createdAt_idx" ON "public"."Application"("program", "createdAt");

-- CreateIndex
CREATE INDEX "Application_paymentStatus_idx" ON "public"."Application"("paymentStatus");
