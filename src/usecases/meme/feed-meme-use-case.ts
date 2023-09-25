import { Id } from "../../entities/id/model/id-value-object"
import { MemeGateway } from "../../entities/meme/gateways/meme-gateway"
import { Meme, Tag } from "../../entities/meme/model/meme"
import { UseCase, DTO } from "../user-case"


/**
 * 
 * input = {
 *  userId: string,
 *  alreadySeen: [
 *    {
 *       id: string
 *    },
 *  ]
 * }
 * 
 * output = {
 *  recomendations: [
 *    {
 *      id: string,
 *      uri: string,
 *      tags: string[] // tags: ["php", "é", "muito", "zuado"]
 *    }
 *  ]
 * }
 * 
 */

interface InputDTO {
  userId: string,
  alreadySeen: Array<{ id: string }>
}

interface OutputDTO {
  recomendations: Array<{ id: Id, uri: string, tags: Tag[] }>
}

export class FeedMemeUseCase implements UseCase<MemeGateway, InputDTO, OutputDTO> {
  constructor(
    readonly gateway: MemeGateway
  ) { }

  async handle(inputDTO: DTO<InputDTO>): Promise<DTO<OutputDTO>> {
    // Pegar os dados do repository, mas qual pegar?
    // Simples, pego os mais tiveram likes, e comentarios em um certo periodo de tempo, por exemplo 30h
    // Com eles em mão, eu jogo eles no Redis (ou LevelDB), e assim fico entregando eles de forma cacheado durando as 11h, 
    // Porém, qnd bater 9h, ele vai rodar um processo q vai elencar os proximos destaques, e jogar para o cache

    const userLast20Likes = await this.gateway.lastLikes(new Id(inputDTO.data.userId), 20)
    const memesInLast1h = await this.gateway.memesInLast1h(userLast20Likes.length)

    const tagsId = {};
    let id = 1;
    for (const meme of userLast20Likes) {
      const tags = meme.tags
      
      for (const tag of tags) {
        if (!(tag.name in tagsId)) {
          (tagsId as any)[tag.name] = id;
          id++;
        }
      }
    }

    for (const meme of memesInLast1h) {
      const tags = meme.tags
      
      for (const tag of tags) {
        if (!(tag.name in tagsId)) {
          (tagsId as any)[tag.name] = id;
          id++;
        }
      }
    }


    const produtoEscalar = userLast20Likes.reduce((acc: number, meme: Meme, index: number) => {
      const tag = meme.tags.filter(tag => tag.name === (tagsId as any)[tag.name])


      return acc + (tagsId as any)[tag[0].name] * memesInLast1h[indice];
    }, 0);

    // Cálculo das normas dos vetores
    const normaVetor1 = Math.sqrt(vetor1.reduce((acumulador, valor) => {
      return acumulador + valor ** 2;
    }, 0));

    const normaVetor2 = Math.sqrt(vetor2.reduce((acumulador, valor) => {
      return acumulador + valor ** 2;
    }, 0));

    // Cálculo da similaridade de cossenos
    const similaridadeDeCossenos = produtoEscalar / (normaVetor1 * normaVetor2);


    const recomendacoes = [];

    for (const meme of todosMemes) {
      // Calcula a similaridade entre o usuário e o meme
      const similaridade = calcularSimilaridade(usuario.tagsCurtidas, meme.tags);

      // Se a similaridade for alta (por exemplo, > 0.5), recomendamos o meme
      if (similaridade > 0.5) {
        recomendacoes.push(meme);
      }
    }

    return recomendacoes;
  }

  // Exemplo: Recomendação de memes para Alice
  const usuarioAlvo = usuarios.find((usuario) => usuario.nome === "Alice");
  const memesRecomendados = recomendarMemes(usuarioAlvo, memes);

    console.log("Memes recomendados para Alice:");
    console.log(memesRecomendados);




    return {
  status: 'SUCCESS',
  data: {
    feed
  }
}
  }
}