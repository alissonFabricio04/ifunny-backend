#include <iostream>
#include <sys/stat.h>
#include <unistd.h>
#include "leveldb-interface.h"

bool setup() {
  char cwd[1024];
  if (getcwd(cwd, sizeof(cwd)) != nullptr) {
    // ./ffi/leveldb/data/
    const char *subdirectory = "/ffi/leveldb/data/";
    const char *directoryPath = strcat(cwd, subdirectory);

    struct stat info;
    if (stat(directoryPath, &info) != 0) {
      const int dirHasCreated = mkdir(directoryPath, S_IRWXU | S_IRWXG | S_IRWXO);
      if (dirHasCreated != 0) {
        std::cerr << "Erro ao criar o diretório: " << directoryPath << std::endl;
        return false;
      }
        
      std::cout << "Diretório criado com sucesso: " << directoryPath << std::endl;
      return true;
    }
  } else {
    std::cerr << "Erro ao obter o diretório de trabalho atual." << std::endl;
    return false;
  }

  return true;
}

int main() {
  if (!setup()) {
    return 0;
  }

  LevelDBInterface db("./ffi/leveldb/data");
  db.put("c++ key", "c++ value");
  // std::cout << db.get("c++ key") << std::endl;
  std::cout << db.get("c++ ke") << std::endl;

  return 0;
}