-- CreateTable
CREATE TABLE "comments_meme" (
    "id" TEXT NOT NULL,
    "fk_comment" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    CONSTRAINT "comments_meme_fk_comment_fkey" FOREIGN KEY ("fk_comment") REFERENCES "comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_meme_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "fk_repub" TEXT NOT NULL,
    CONSTRAINT "comments_fk_repub_fkey" FOREIGN KEY ("fk_repub") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_meme_id_key" ON "comments_meme"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");
