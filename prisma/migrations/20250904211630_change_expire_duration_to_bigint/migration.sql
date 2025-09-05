-- DropForeignKey
ALTER TABLE "public"."Class" DROP CONSTRAINT "Class_coachingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Class" DROP CONSTRAINT "Class_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" DROP CONSTRAINT "CoachingFeePaymentByStudent_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" DROP CONSTRAINT "CoachingFeePaymentByStudent_coachingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" DROP CONSTRAINT "CoachingFeePaymentByStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoachingStudent" DROP CONSTRAINT "CoachingStudent_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoachingStudent" DROP CONSTRAINT "CoachingStudent_coachingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoachingStudent" DROP CONSTRAINT "CoachingStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CollegeStudent" DROP CONSTRAINT "CollegeStudent_classId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CollegeStudent" DROP CONSTRAINT "CollegeStudent_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CollegeStudent" DROP CONSTRAINT "CollegeStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" DROP CONSTRAINT "StudentAdmissionRequest_coachingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" DROP CONSTRAINT "StudentAdmissionRequest_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" DROP CONSTRAINT "StudentAdmissionRequest_studentId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Class" ADD CONSTRAINT "Class_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Class" ADD CONSTRAINT "Class_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" ADD CONSTRAINT "CoachingFeePaymentByStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" ADD CONSTRAINT "CoachingFeePaymentByStudent_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" ADD CONSTRAINT "CoachingFeePaymentByStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingStudent" ADD CONSTRAINT "CoachingStudent_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingStudent" ADD CONSTRAINT "CoachingStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingStudent" ADD CONSTRAINT "CoachingStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeStudent" ADD CONSTRAINT "CollegeStudent_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeStudent" ADD CONSTRAINT "CollegeStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeStudent" ADD CONSTRAINT "CollegeStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" ADD CONSTRAINT "StudentAdmissionRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" ADD CONSTRAINT "StudentAdmissionRequest_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" ADD CONSTRAINT "StudentAdmissionRequest_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE CASCADE ON UPDATE CASCADE;
