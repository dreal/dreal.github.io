Build Instructions (on Ubuntu 12.04 LTS)
========================================

1. Install g++-4.8
------------------

    sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
    sudo add-apt-repository ppa:dns/gnu -y
    sudo update-alternatives --remove-all gcc
    sudo update-alternatives --remove-all g++
    sudo apt-get update
    sudo apt-get install -qq autoconf automake libtool git g++-4.8
    sudo apt-get upgrade
    sudo apt-get dist-upgrade -y

2. Install Bison, Flex, Cmake
-----------------------------

    sudo add-apt-repository ppa:kalakris/cmake -y
    sudo apt-get update
    sudo apt-get install -qq bison flex cmake

3. Install EGLIBC-2.17 (Optional)
----------------------------------

Using eglibc (<= 2.16) may cause severe errors in floating point
computation if ``FE_UPWARD``, ``FE_DOWNWARD``, and ``FE_TOWARDZERO``
rounding modes are used. If you're using Ubuntu OS (<= 12.10) or
Debian (<= 7.2), please check the version of your eglibc by typing:

    ldd --version

If the version is <= 2.16, please check out the latest version of eglibc:

    svn co http://www.eglibc.org/svn/trunk eglibc


and install them on your machine. (we recommend to install on your home dir)

    cd <HOME_PATH>
    svn co svn://svn.eglibc.org/branches/eglibc-2_17 eglibc-2.17
    mkdir eglibc-2.17-build
    mkdir eglibc
    cd eglibc-2.17-build
    ../eglibc-2.17/libc/configure --prefix=<HOME_PATH>/../eglibc
    make
    make install

4. Build dReal
--------------

    git clone git@github.com:soonhokong/dReal.git dreal
    cd dreal
    mkdir -p build/release
    cd build/release
    cmake -DCMAKE_BUILD_TYPE=RELEASE -DCMAKE_CXX_COMPILER=g++-4.8 -DCMAKE_C_COMPILER=gcc-4.8 ../../src
    make

If you want to link dReal with a self-compiled eglibc, use ``-DGLIBCPATH=<absolute_path>``:

    cmake -DCMAKE_BUILD_TYPE=RELEASE -DCMAKE_CXX_COMPILER=g++-4.8 \
        -DCMAKE_C_COMPILER=gcc-4.8 -DGLIBCPATH=/home/<user>/glibc ../src

5. Build dReach
---------------

Install OCaml and libraries using [opam][opam]:

    sudo apt-get install opam
    opam init
    eval `opam config env`
    opam update
    opam install ocamlfind batteries

Build tools:

    cd dReal/tools
    make

[opam]: http://opam.ocamlpro.com/
