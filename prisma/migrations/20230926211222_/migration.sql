/*
  Warnings:

  - Added the required column `fk_author` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "fk_repub" TEXT NOT NULL,
    "fk_author" TEXT NOT NULL,
    CONSTRAINT "comments_fk_repub_fkey" FOREIGN KEY ("fk_repub") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_fk_author_fkey" FOREIGN KEY ("fk_author") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("fk_repub", "id", "text") SELECT "fk_repub", "id", "text" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
