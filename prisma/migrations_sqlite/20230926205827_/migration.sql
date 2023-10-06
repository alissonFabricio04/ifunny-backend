-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_memes" (
    "id" TEXT NOT NULL,
    "fk_author" TEXT NOT NULL,
    "content_uri" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "memes_fk_author_fkey" FOREIGN KEY ("fk_author") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_memes" ("content_uri", "fk_author", "id") SELECT "content_uri", "fk_author", "id" FROM "memes";
DROP TABLE "memes";
ALTER TABLE "new_memes" RENAME TO "memes";
CREATE UNIQUE INDEX "memes_id_key" ON "memes"("id");
CREATE UNIQUE INDEX "memes_content_uri_key" ON "memes"("content_uri");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
