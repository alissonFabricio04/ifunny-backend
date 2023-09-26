/*
  Warnings:

  - Added the required column `fk_author` to the `comments_meme` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments_meme" (
    "id" TEXT NOT NULL,
    "fk_author" TEXT NOT NULL,
    "fk_comment" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    CONSTRAINT "comments_meme_fk_author_fkey" FOREIGN KEY ("fk_author") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_meme_fk_comment_fkey" FOREIGN KEY ("fk_comment") REFERENCES "comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_meme_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comments_meme" ("fk_comment", "fk_meme", "id") SELECT "fk_comment", "fk_meme", "id" FROM "comments_meme";
DROP TABLE "comments_meme";
ALTER TABLE "new_comments_meme" RENAME TO "comments_meme";
CREATE UNIQUE INDEX "comments_meme_id_key" ON "comments_meme"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
