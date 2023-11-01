/* eslint-disable @typescript-eslint/no-explicit-any */

import Id from '../../src/domain/Id'
import Folder from '../../src/domain/Folder'
import Image from '../../src/domain/Image'

let folder: {
  id: string
  name: string
  thumbnail: string
}

beforeEach(() => {
  folder = {
    id: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
    name: 'literalmente eu',
    thumbnail:
      'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII=',
  }
})

test('it should not be able to create a new folder if id is invalid', () => {
  expect(
    () => new Folder({} as Id, folder.name, new Image(folder.thumbnail)),
  ).toThrow('Id não foi fornecido')
})

test('it should not be able to create a new folder if folder name not was informed', () => {
  expect(
    () =>
      new Folder(
        new Id(folder.id),
        undefined as any,
        new Image(folder.thumbnail),
      ),
  ).toThrow('O nome da pasta não foi fornecido')
})

test('it should not be able to create a new folder if folder name are blank', () => {
  expect(
    () => new Folder(new Id(folder.id), '', new Image(folder.thumbnail)),
  ).toThrow('O nome da pasta não foi fornecido')
})

test('it should not be able to create a new folder if folder name has special characters', () => {
  expect(
    () => new Folder(new Id(folder.id), '@@@@@', new Image(folder.thumbnail)),
  ).toThrow('O nome da pasta não deve possuir caracteres especias')
})

test('it should not be able to create a new folder if folder name is too long', () => {
  expect(
    () =>
      new Folder(
        new Id(folder.id),
        'Aa1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        new Image(folder.thumbnail),
      ),
  ).toThrow('O nome da pasta é muito longo')
})

test('it should not be able to create a new folder if folder name is too short', () => {
  expect(
    () => new Folder(new Id(folder.id), 'A', new Image(folder.thumbnail)),
  ).toThrow('O nome da pasta é muito curto')
})

test('it should not be able to create a new folder if thumbnail not was informed', () => {
  expect(() => new Folder(new Id(folder.id), folder.name, {} as Image)).toThrow(
    'Thumbnail não foi fornecido',
  )
})

test('it should be able get id', () => {
  const f = new Folder(
    new Id(folder.id),
    folder.name,
    new Image(folder.thumbnail),
  )

  expect(f.id).toStrictEqual(new Id(folder.id))
})

test('it should be able get folder name', () => {
  const f = new Folder(
    new Id(folder.id),
    folder.name,
    new Image(folder.thumbnail),
  )

  expect(f.name).toStrictEqual(folder.name)
})

test('it should be able get thumbnail', () => {
  const f = new Folder(
    new Id(folder.id),
    folder.name,
    new Image(folder.thumbnail),
  )

  expect(f.thumbnail).toStrictEqual(new Image(folder.thumbnail))
})
