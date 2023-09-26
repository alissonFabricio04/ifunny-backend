import { FeedMemeController } from '../controllers/feed-meme-controller'
import { LikeMemeController } from '../controllers/like-meme-controller'
import { PublishMemeController } from '../controllers/publish-meme-controller'
import { SignInController } from '../controllers/signIn-controller'
import { SignUpController } from '../controllers/signUp-controller'

export async function router(request: Request) {
  const url = new URL(request.url)

  if (url.pathname === '/sign-up' && request.method === 'POST') {
    return SignUpController.handle(request)
  }

  if (url.pathname === '/sign-in' && request.method === 'POST') {
    return SignInController.handle(request)
  }

  if (url.pathname === '/publish-meme' && request.method === 'POST') {
    return PublishMemeController.handle(request)
  }

  if (url.pathname === '/feed' && request.method === 'POST') {
    return FeedMemeController.handle(request)
  }

  if (url.pathname === '/like' && request.method === 'POST') {
    return LikeMemeController.handle(request)
  }

  if (url.pathname === '/add-comment' && request.method === 'GET') {
    return SignInController.handle(request)
  }

  return new Response(null, { status: 404 })
}
