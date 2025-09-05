-- DropForeignKey
ALTER TABLE "public"."CoachingClassPricing" DROP CONSTRAINT "CoachingClassPricing_coachingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" DROP CONSTRAINT "CoachingFeePaymentByStudent_coachingClassPricingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CollegeClassPricing" DROP CONSTRAINT "CollegeClassPricing_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" DROP CONSTRAINT "CollegeFeePaymentByStudent_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" DROP CONSTRAINT "CollegeFeePaymentByStudent_collegeClassPricingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" DROP CONSTRAINT "CollegeFeePaymentByStudent_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" DROP CONSTRAINT "CollegeFeePaymentByStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Student" DROP CONSTRAINT "Student_parentId_fkey";

-- AlterTable
ALTER TABLE "public"."CollegeFeePaymentByStudent" ALTER COLUMN "expireDuration" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingClassPricing" ADD CONSTRAINT "CoachingClassPricing_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeClassPricing" ADD CONSTRAINT "CollegeClassPricing_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" ADD CONSTRAINT "CoachingFeePaymentByStudent_coachingClassPricingId_fkey" FOREIGN KEY ("coachingClassPricingId") REFERENCES "public"."CoachingClassPricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" ADD CONSTRAINT "CollegeFeePaymentByStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" ADD CONSTRAINT "CollegeFeePaymentByStudent_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" ADD CONSTRAINT "CollegeFeePaymentByStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" ADD CONSTRAINT "CollegeFeePaymentByStudent_collegeClassPricingId_fkey" FOREIGN KEY ("collegeClassPricingId") REFERENCES "public"."CollegeClassPricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
