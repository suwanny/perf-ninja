

#include <glog/logging.h>


int
main(int argc, char *argv[])
{
  google::InitGoogleLogging("INFO");
  LOG(INFO) << "Hello, World!" << "print ... something" ;
  LOG(INFO) << "Before create....";
  LOG(INFO) << "Before run....";
  LOG(INFO) << "Before finish....";
  return 0;
}