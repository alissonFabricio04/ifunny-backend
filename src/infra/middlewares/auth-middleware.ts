import jwt from 'jsonwebtoken'
import { Controller } from '../controllers/controller'

export async function AuthMiddleware(request: Request, controller: Controller) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Nenhum token fornecido' }),
      { status: 401 }
    )
  }

  const partsOfToken = authHeader.split(' ')

  if (partsOfToken.length !== 2) {
    return new Response(
      JSON.stringify({ error: 'Token inválido' }),
      { status: 401 }
    )
  }

  const [scheme, token] = partsOfToken

  if (!/^Bearer$/i.test(scheme)) {
    return new Response(
      JSON.stringify({ error: 'Token mal formatado' }),
      { status: 401 }
    )
  }

  try {
    const tokenDecoded = jwt.verify(
      token,
      String(Bun.env.JWT_SECRET),
    ) as {
      id: string
    }

    if (request.method !== 'GET') {
      const body = await Bun.readableStreamToJSON(
        request.body ?? new ReadableStream(),
      )

      if (!body) {
        throw new Error('Falta de conteúdo na requisição')
      }

      return controller.handle({ ...body, userId: tokenDecoded.id })
    }

    const { searchParams } = new URL(request.url)

    const params: any = {}
    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }

    return controller.handle({ ...params, userId: tokenDecoded.id })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Token inválido' }),
      { status: 401 }
    )
  }
}