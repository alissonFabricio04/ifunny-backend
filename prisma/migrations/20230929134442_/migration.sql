/*
  Warnings:

  - Added the required column `fk_meme` to the `repubs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_repubs" (
    "id" TEXT NOT NULL,
    "fk_folder" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    CONSTRAINT "repubs_fk_folder_fkey" FOREIGN KEY ("fk_folder") REFERENCES "folders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "repubs_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_repubs" ("fk_folder", "id") SELECT "fk_folder", "id" FROM "repubs";
DROP TABLE "repubs";
ALTER TABLE "new_repubs" RENAME TO "repubs";
CREATE UNIQUE INDEX "repubs_id_key" ON "repubs"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
