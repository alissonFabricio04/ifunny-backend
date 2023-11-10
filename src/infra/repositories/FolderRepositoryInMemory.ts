import FolderRepository from '../../application/repositories/FolderRepository'
import Folder from '../../domain/Folder'
import Id from '../../domain/Id'
import Name from '../../domain/Name'

export default class FolderRepositoryInMemory implements FolderRepository {
  folders: { userId: Id; folders: Folder[] }[] = []

  async save(folder: Folder) {
    const userData = this.folders.find(({ userId }) => {
      return userId.getValue() === folder.ownerId.getValue()
    })

    if (!userData) {
      this.folders.push({ userId: folder.ownerId, folders: [folder] })
      return
    }

    userData.folders.push(folder)

    this.folders = this.folders.filter(({ userId, folders }) => {
      if (userId.getValue() === folder.ownerId.getValue()) {
        return userData
      }

      return {
        userId,
        folders,
      }
    })
  }

  async get(folderId: Id) {
    let folder = null

    for (const userData of this.folders) {
      for (const f of userData.folders) {
        if (f.folderId.getValue() === folderId.getValue()) {
          folder = f
        }
      }
    }

    return folder
  }

  async getAll(user: Id) {
    const userData = this.folders.find(({ userId }) => {
      return userId.getValue() === user.getValue()
    })

    if (!userData) {
      return []
    }

    return userData.folders
  }

  async getByName(user: Id, folderName: Name) {
    const userData = this.folders.find(({ userId }) => {
      return userId.getValue() === user.getValue()
    })

    if (!userData) {
      return null
    }

    let folder = null
    for (const f of userData.folders) {
      if (f.getName() === folderName.getValue()) {
        folder = f
      }
    }

    return folder
  }

  async update(folder: Folder) {
    this.folders = this.folders.filter((userData) => {
      if (userData.userId.getValue() === folder.ownerId.getValue()) {
        const folders = userData.folders.filter((f) => {
          if (f.folderId.getValue() === folder.folderId.getValue()) {
            return folder
          }

          return f
        })

        return {
          ...userData,
          folders,
        }
      }

      return userData
    })
  }
}
