-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "loginTime" TIMESTAMP(6) NOT NULL,
    "LogoutTime" TIMESTAMP(6),
    "ipAddress" VARCHAR(15),
    "type" VARCHAR(50) NOT NULL,
    "column_6" TEXT,
    "column_7" TEXT,
    "column_8" TEXT,
    "userName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attack" (
    "id" SERIAL NOT NULL,
    "attackType" VARCHAR(50) NOT NULL,
    "ipAddress" VARCHAR(15),
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" TEXT,
    "role" TEXT DEFAULT 'user',
    "userName" VARCHAR(50) NOT NULL,
    "column_8" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("userName") ON DELETE NO ACTION ON UPDATE NO ACTION;
