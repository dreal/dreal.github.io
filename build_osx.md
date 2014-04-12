Build Instructions (on Mac OSX 10.9)
====================================

[Homebrew][homebrew] is a package manager fox OS X. We assume that
you're using homebrew to install packages.

    ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

[homebrew]: http://brew.sh

1. Install gcc-4.8/automake/autoconf/libtool/git/cmake
------------------------------------------------------

    brew tap homebrew/versions
    brew update
    brew install gcc48 automake autoconf libtool git cmake


2. Build dReal
--------------

    git clone git@github.com:soonhokong/dReal.git dreal
    cd dreal
    mkdir -p build/release
    cd build/release
    cmake -DCMAKE_BUILD_TYPE=RELEASE -DCMAKE_CXX_COMPILER=g++-4.8 -DCMAKE_C_COMPILER=gcc-4.8 ../../src
    make


3. Build dReach
---------------

Install OCaml and libraries using [opam][opam]:

    brew install ocaml opam
    opam init
    eval `opam config env`
    opam update
    opam install ocamlfind batteries

Build tools:

    cd dReal/tools
    make

[opam]: http://opam.ocamlpro.com/
