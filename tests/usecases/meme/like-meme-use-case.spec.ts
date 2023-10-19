import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { Id } from '../../../src/domain/value-objects/id/model/id-value-object'
import { MemeGateway } from '../../../src/domain/entities/meme/gateways/meme-gateway'
import { Meme } from '.../../../src/domain/entities/meme/model/meme'
import { LikeMemeUseCase } from '../../../src/usecases/meme/like-meme-use-case'
import { Image } from '../../../src/domain/value-objects/image/model/image-value-object'

describe('Suite test for testing like meme use case', () => {
  let meme: Meme
  let gateway: MemeGateway
  let likeMemeUseCase: LikeMemeUseCase

  beforeEach(() => {
    meme = new Meme(
      new Id('d262ab0d-6d32-4a12-a651-06af51c40a69'),
      new Id('5d86c647-3265-4cf4-babb-e5ce353a446a'),
      new Image('data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII='),
      [
        { name: 'nazismo', weight: 10 },
        { name: 'é', weight: 2 },
        { name: 'uma', weight: 2 },
        { name: 'merda', weight: 10 },
      ],
    )

    gateway = {
      publish: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      find: jest.fn().mockImplementationOnce(() => Promise.resolve(meme)),
      recentMemesNotLikedByUser: () => new Promise((resolve) => resolve([])),
      lastLikes: () => new Promise((resolve) => resolve([])),
      like: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      alreadyLikedMeme: jest.fn().mockImplementationOnce(() => Promise.resolve(false)),
      highlights: () => new Promise((resolve) => resolve([])),
      collective: () => new Promise((resolve) => resolve([])),
      getMemeInFolder: () => new Promise((resolve) => resolve([])),
    } satisfies MemeGateway

    likeMemeUseCase = new LikeMemeUseCase(gateway)
  })

  test('it should be able possible give a like in a meme', async () => {
    const input = {
      data: {
        userId: '8f451c11-ef44-4970-a4f8-e083ed6f5c62',
        memeId: meme.id.toString()
      },
    }

    await expect(await likeMemeUseCase.handle(input)).toStrictEqual({
      status: 'SUCCESS',
      data: {},
    })
  })
})
