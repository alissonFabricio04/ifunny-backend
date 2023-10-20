#include <iostream>
#include <leveldb/db.h>
#include "leveldb-interface.h"

LevelDBInterface::LevelDBInterface(std::string dbPath = "./ffi/leveldb/data") {
  options.create_if_missing = true;
  leveldb::Status status = leveldb::DB::Open(options, dbPath, &db);
  if (!status.ok()) {
    std::cerr << "Erro ao abrir o banco de dados: " << status.ToString() << std::endl;
    return;
  }
}

void LevelDBInterface::put(std::string key, std::string value) {
  leveldb::WriteOptions write_options;
  this->db->Put(write_options, key, value);
  // delete this->db;
}

std::string LevelDBInterface::get(std::string key) {
  leveldb::ReadOptions read_options;
  
  std::string value;
  leveldb::Status status = db->Get(read_options, key, &value);
  if (status.ok()) {
    return value;
  }

  // delete this->db;
  return nullptr;
}
