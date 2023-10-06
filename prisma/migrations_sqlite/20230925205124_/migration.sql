-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "memes" (
    "id" TEXT NOT NULL,
    "fk_author" TEXT NOT NULL,
    "content_uri" TEXT NOT NULL,
    CONSTRAINT "memes_fk_author_fkey" FOREIGN KEY ("fk_author") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    CONSTRAINT "tags_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "memes_id_key" ON "memes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "memes_content_uri_key" ON "memes"("content_uri");

-- CreateIndex
CREATE UNIQUE INDEX "tags_id_key" ON "tags"("id");
