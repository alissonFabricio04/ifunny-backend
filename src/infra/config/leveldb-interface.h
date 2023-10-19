#include <leveldb/db.h>

class LevelDBInterface {
  private:
    leveldb::DB* db;
    leveldb::Options options;

  public:
    LevelDBInterface(std::string dbPath);
    void put(std::string key, std::string value);
    std::string get(std::string key);
};
