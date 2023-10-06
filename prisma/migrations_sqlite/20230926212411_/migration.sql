-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "fk_user" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    CONSTRAINT "likes_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "likes_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_id_key" ON "likes"("id");
