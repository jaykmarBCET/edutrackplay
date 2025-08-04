-- CreateTable
CREATE TABLE "public"."Parent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "otp" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "score" INTEGER,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "parentId" INTEGER,
    "avatar" TEXT NOT NULL,
    "coverImage" TEXT,
    "cardId" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Coaching" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "owner_email" TEXT NOT NULL,
    "owner_phone" TEXT,
    "password" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "logo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coaching_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."College" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "owner_email" TEXT NOT NULL,
    "owner_phone" TEXT,
    "password" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "logo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stander" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "collegeId" INTEGER,
    "coachingId" INTEGER,
    "session" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoachingClassPricing" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "coachingId" INTEGER NOT NULL,
    "stander" INTEGER NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachingClassPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CollegeClassPricing" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "stander" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollegeClassPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoachingFeePaymentByStudent" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "coachingId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "expireDuration" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "coachingClassPricingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachingFeePaymentByStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CollegeFeePaymentByStudent" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "collegeClassPricingId" INTEGER NOT NULL,
    "expireDuration" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Payment Pending',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollegeFeePaymentByStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoachingStudent" (
    "id" SERIAL NOT NULL,
    "rollNumber" INTEGER NOT NULL,
    "coachingId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachingStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CollegeStudent" (
    "id" SERIAL NOT NULL,
    "rollNumber" INTEGER NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollegeStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StudentAdmissionRequest" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "collegeId" INTEGER,
    "coachingId" INTEGER,
    "field" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stander" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAccept" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAdmissionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "public"."Parent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "public"."Student"("email");

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Class" ADD CONSTRAINT "Class_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Class" ADD CONSTRAINT "Class_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingClassPricing" ADD CONSTRAINT "CoachingClassPricing_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeClassPricing" ADD CONSTRAINT "CollegeClassPricing_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" ADD CONSTRAINT "CoachingFeePaymentByStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" ADD CONSTRAINT "CoachingFeePaymentByStudent_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" ADD CONSTRAINT "CoachingFeePaymentByStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingFeePaymentByStudent" ADD CONSTRAINT "CoachingFeePaymentByStudent_coachingClassPricingId_fkey" FOREIGN KEY ("coachingClassPricingId") REFERENCES "public"."CoachingClassPricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" ADD CONSTRAINT "CollegeFeePaymentByStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" ADD CONSTRAINT "CollegeFeePaymentByStudent_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" ADD CONSTRAINT "CollegeFeePaymentByStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeFeePaymentByStudent" ADD CONSTRAINT "CollegeFeePaymentByStudent_collegeClassPricingId_fkey" FOREIGN KEY ("collegeClassPricingId") REFERENCES "public"."CollegeClassPricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingStudent" ADD CONSTRAINT "CoachingStudent_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingStudent" ADD CONSTRAINT "CoachingStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingStudent" ADD CONSTRAINT "CoachingStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeStudent" ADD CONSTRAINT "CollegeStudent_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeStudent" ADD CONSTRAINT "CollegeStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CollegeStudent" ADD CONSTRAINT "CollegeStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" ADD CONSTRAINT "StudentAdmissionRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" ADD CONSTRAINT "StudentAdmissionRequest_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAdmissionRequest" ADD CONSTRAINT "StudentAdmissionRequest_coachingId_fkey" FOREIGN KEY ("coachingId") REFERENCES "public"."Coaching"("id") ON DELETE SET NULL ON UPDATE CASCADE;
