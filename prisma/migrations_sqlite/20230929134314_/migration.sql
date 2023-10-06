/*
  Warnings:

  - You are about to drop the `comments_meme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `fk_repub` on the `comments` table. All the data in the column will be lost.
  - Added the required column `fk_meme` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "comments_meme_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "comments_meme";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL,
    "fk_owner" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,
    CONSTRAINT "folders_fk_owner_fkey" FOREIGN KEY ("fk_owner") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "fk_author" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    CONSTRAINT "comments_fk_author_fkey" FOREIGN KEY ("fk_author") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("fk_author", "id", "text") SELECT "fk_author", "id", "text" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "folders_id_key" ON "folders"("id");
