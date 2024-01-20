-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "qualifications" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reactjsExp" TEXT NOT NULL,
    "nodejsExp" TEXT NOT NULL,
    "expectedSalary" INTEGER NOT NULL,
    "computedScore" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
