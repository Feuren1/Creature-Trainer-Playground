-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatureBase" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spd" INTEGER,
    "hp" INTEGER,
    "atk" INTEGER,
    "def" INTEGER,
    "elementId" TEXT,
    "variant" TEXT,
    "lore" TEXT,

    CONSTRAINT "CreatureBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creature" (
    "id" TEXT NOT NULL,
    "baseId" TEXT NOT NULL,
    "nickName" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Creature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttackBase" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "atk" INTEGER,
    "elementId" TEXT,
    "type" TEXT,
    "usesLeft" INTEGER,
    "description" TEXT,

    CONSTRAINT "AttackBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attacks" (
    "id" TEXT NOT NULL,
    "creatureId" TEXT NOT NULL,
    "attackBaseId" TEXT NOT NULL,
    "usesLeft" INTEGER,
    "slotIndex" INTEGER NOT NULL,

    CONSTRAINT "Attacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamCreature" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "creatureId" TEXT NOT NULL,
    "teamPosition" INTEGER NOT NULL,

    CONSTRAINT "TeamCreature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Element_name_key" ON "Element"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamCreature_creatureId_key" ON "TeamCreature"("creatureId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatureBase" ADD CONSTRAINT "CreatureBase_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "CreatureBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttackBase" ADD CONSTRAINT "AttackBase_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attacks" ADD CONSTRAINT "Attacks_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attacks" ADD CONSTRAINT "Attacks_attackBaseId_fkey" FOREIGN KEY ("attackBaseId") REFERENCES "AttackBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamCreature" ADD CONSTRAINT "TeamCreature_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamCreature" ADD CONSTRAINT "TeamCreature_creatureId_fkey" FOREIGN KEY ("creatureId") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
