# libevent http client 

## Prerequisite

    $ brew install libevent
    $ brew install glog
    

## Prepare to compile

    $ autoreconf --install
or
    $ autoreconf -fi

## Compile

    $ ./configure
    $ make



## Make a package

    $ make distcheck