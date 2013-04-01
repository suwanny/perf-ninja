
#include "load_runner.h"
#include <time.h>       /* clock_t, clock, CLOCKS_PER_SEC */
#include <sys/time.h>


LoadRunner::LoadRunner(){
  log("created!\n");
}

LoadRunner::~LoadRunner(){
  log("destroyed!\n");
}


void
LoadRunner::run(){
  log("run!\n");
  
  log("initializing libevent subsystem..\n");
  event_init();

  log("before send a request..\n");
  send_request("127.0.0.1", 5000);

  log("starting event loop..\n");
  event_dispatch();
}

void
LoadRunner::stop(){
  log("stop!\n");
  event_loopexit(NULL);
}


struct evhttp_request *
LoadRunner::send_request(const char *addr, const unsigned int port){
  const char *state = "client-1";

  struct evhttp_connection *conn;
  struct evhttp_request *req;
  conn = evhttp_connection_new(addr, port);
  evhttp_connection_set_timeout(conn, 5);

  // misc. state you can pass as argument to your handler
  // such as a client id or runtime id.
  req = evhttp_request_new(onRequest, (void *)this);
  
  evhttp_add_header(req->output_headers, "Host", addr);
  evhttp_add_header(req->output_headers, "Content-Length", "0");
  evhttp_make_request(conn, req, EVHTTP_REQ_GET, "/");
  return req;
}

void 
LoadRunner::onRequest(struct evhttp_request *req, void *state)
{
  LoadRunner *runner = (LoadRunner *) state;
  runner->log("in onRequest. \n");

  if (req == NULL) {
    runner->log("timed out!\n");
  } else if (req->response_code == 0) {
    runner->log("connection refused!\n");
  } else if (req->response_code != 200) {
    runner->log("error: %u %s\n", req->response_code, req->response_code_line);
  } else {
    runner->log("success: %u %s\n", req->response_code, req->response_code_line);
  }
    
}


// http://stlib.sourceforge.net/docs/Timestamp_8cc-source.html

void
LoadRunner::log(const char *format, ...){
  struct timeval timestamp;
  struct timezone tz;
  time_t rawtime;
  struct tm* time;
  
  va_list args;

  gettimeofday(&timestamp, &tz);
  time = localtime(&timestamp.tv_sec);

  printf("[%2d/%2d/%4d %02d:%02d:%02d.%06d] ", 
    time->tm_mon+1, 
    time->tm_mday, 
    time->tm_year+1900,
    time->tm_hour, 
    time->tm_min, 
    time->tm_sec,
    timestamp.tv_usec);

  va_start (args, format);
  vprintf (format, args);
  va_end (args);
}




