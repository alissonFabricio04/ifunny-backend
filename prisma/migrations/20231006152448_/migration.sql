-- CreateEnum
CREATE TYPE "votes_comments_types" AS ENUM ('UPVOTE', 'DOWNVOTE');

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "fk_repub" TEXT,
    "fk_author" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "votes_comments" (
    "id" TEXT NOT NULL,
    "fk_comment" TEXT NOT NULL,
    "fk_user" TEXT NOT NULL,
    "type" "votes_comments_types" NOT NULL
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "fk_user" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL,
    "fk_owner" TEXT NOT NULL,
    "folderName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "repubs" (
    "id" TEXT NOT NULL,
    "fk_folder" TEXT NOT NULL,
    "fk_meme" TEXT NOT NULL
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

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_fk_repub_key" ON "comments"("fk_repub");

-- CreateIndex
CREATE UNIQUE INDEX "votes_comments_id_key" ON "votes_comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_id_key" ON "likes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "folders_id_key" ON "folders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "repubs_id_key" ON "repubs"("id");

-- AddForeignKey
ALTER TABLE "memes" ADD CONSTRAINT "memes_fk_author_fkey" FOREIGN KEY ("fk_author") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk_repub_fkey" FOREIGN KEY ("fk_repub") REFERENCES "repubs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk_author_fkey" FOREIGN KEY ("fk_author") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes_comments" ADD CONSTRAINT "votes_comments_fk_comment_fkey" FOREIGN KEY ("fk_comment") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes_comments" ADD CONSTRAINT "votes_comments_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_fk_owner_fkey" FOREIGN KEY ("fk_owner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repubs" ADD CONSTRAINT "repubs_fk_folder_fkey" FOREIGN KEY ("fk_folder") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repubs" ADD CONSTRAINT "repubs_fk_meme_fkey" FOREIGN KEY ("fk_meme") REFERENCES "memes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
