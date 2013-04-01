
#include <event.h>
#include <evhttp.h>


class LoadRunner
{
  
public:
  LoadRunner();
  virtual ~LoadRunner();

public:
  void run();
  void stop();
  
  struct evhttp_request * 
  send_request(const char *addr, const unsigned int port);

  static void 
  onRequest(struct evhttp_request *req, void *state);

private:

  void log(const char *format, ...);


};

