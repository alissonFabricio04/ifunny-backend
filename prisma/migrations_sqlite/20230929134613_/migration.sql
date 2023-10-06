-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "fk_repub" TEXT,
    "fk_author" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    CONSTRAINT "comments_fk_repub_fkey" FOREIGN KEY ("fk_repub") REFERENCES "repubs" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "comments_fk_author_fkey" FOREIGN KEY ("fk_author") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("fk_author", "fk_meme", "id", "text") SELECT "fk_author", "fk_meme", "id", "text" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");
CREATE UNIQUE INDEX "comments_fk_repub_key" ON "comments"("fk_repub");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;