import { AddCommentController } from '../controllers/add-comment-controller'
import { FeedMemeController } from '../controllers/feed-meme-controller'
import { GetCommentsFromMemeController } from '../controllers/get-comments-from-meme-controller'
import { LikeMemeController } from '../controllers/like-meme-controller'
import { PublishMemeController } from '../controllers/publish-meme-controller'
import { SignInController } from '../controllers/signIn-controller'
import { SignUpController } from '../controllers/signUp-controller'
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

  return new Response(null, { status: 404 })
}
