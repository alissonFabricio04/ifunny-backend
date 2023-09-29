import { AddCommentController } from '../controllers/meme/add-comment-controller'
import { FeedMemeController } from '../controllers/meme/feed-meme-controller'
import { GetCommentsFromMemeController } from '../controllers/meme/get-comments-from-meme-controller'
import { LikeMemeController } from '../controllers/meme/like-meme-controller'
import { PublishMemeController } from '../controllers/meme/publish-meme-controller'
import { CreateNewFolderController } from '../controllers/user/create-new-folder-controller'
import { GetFoldersController } from '../controllers/user/get-folders-use-case'
import { GetMemesInFolderController } from '../controllers/user/get-memes-in-folder-controller'
import { RepubMemeController } from '../controllers/user/repub-meme-controller'
import { SignInController } from '../controllers/user/signIn-controller'
import { SignUpController } from '../controllers/user/signUp-controller'
import { AuthMiddleware } from '../middlewares/auth-middleware'

export async function router(request: Request) {
  const url = new URL(request.url)
  
  if (url.pathname === '/sign-up' && request.method === 'POST') {
    return new SignUpController().handle(request)
  }

  if (url.pathname === '/sign-in' && request.method === 'POST') {
    return new SignInController().handle(request)
  }

  if (url.pathname === '/publish-meme' && request.method === 'POST') {
    return AuthMiddleware(request, new PublishMemeController())
  }

  if (url.pathname === '/feed' && request.method === 'GET') {
    return AuthMiddleware(request, new FeedMemeController())
  }

  if (url.pathname === '/like' && request.method === 'POST') {
    return AuthMiddleware(request, new LikeMemeController())
  }

  if (url.pathname === '/add-comment' && request.method === 'POST') {
    return AuthMiddleware(request, new AddCommentController())
  }

  if (url.pathname === '/get-comments' && request.method === 'GET') {
    return AuthMiddleware(request, new GetCommentsFromMemeController())
  }
  
  if (url.pathname === '/create-folder' && request.method === 'POST') {
    return AuthMiddleware(request, new CreateNewFolderController())
  }

  if (url.pathname === '/get-folders' && request.method === 'GET') {
    return AuthMiddleware(request, new GetFoldersController())
  }

  if (url.pathname === '/repub-meme' && request.method === 'POST') {
    return AuthMiddleware(request, new RepubMemeController())
  }

  if (url.pathname === '/get-memes-in-folder' && request.method === 'GET') {
    return AuthMiddleware(request, new GetMemesInFolderController())
  }

  return new Response(null, { status: 404 })
}
