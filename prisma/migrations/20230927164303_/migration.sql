-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tags" (
    "id" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DECIMAL NOT NULL DEFAULT 1,
    CONSTRAINT "tags_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tags" ("fk_meme", "id", "name", "weight") SELECT "fk_meme", "id", "name", "weight" FROM "tags";
DROP TABLE "tags";
ALTER TABLE "new_tags" RENAME TO "tags";
CREATE UNIQUE INDEX "tags_id_key" ON "tags"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
