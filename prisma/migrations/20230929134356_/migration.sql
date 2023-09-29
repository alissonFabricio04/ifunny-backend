-- CreateTable
CREATE TABLE "repubs" (
    "id" TEXT NOT NULL,
    "fk_folder" TEXT NOT NULL,
    CONSTRAINT "repubs_fk_folder_fkey" FOREIGN KEY ("fk_folder") REFERENCES "folders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "repubs_id_key" ON "repubs"("id");
