import { router } from './src/infra/config/routes'

export const serve = Bun.serve({
  port: Number(Bun.env.PORT),
  fetch: router,
  error(error: Error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
})
