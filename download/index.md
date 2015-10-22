---
layout: archive
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

Ubuntu/Debian
-------------

We provide a PPA for Ubuntu 12.04 LTS (precise), 14.04 LTS (trusty), and 14.14 (utopic).
It supports i386 and amd64 architectures. On those systems, run the following scripts on a terminal to install dReal:

{% highlight bash %}
sudo apt-get install -y python-software-properties  # only for 12.04 to have add-apt-repository 
sudo add-apt-repository -y ppa:dreal/dreal
sudo add-apt-repository -y ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install -y dreal
{% endhighlight %}

To upgrade dReal to the latest version, run:
{% highlight bash %}
sudo apt-get update
sudo apt-get upgrade dreal
{% endhighlight %}

[This page](https://launchpad.net/~dreal/+archive/ubuntu/dreal/+packages) provides detailed information
about the packages. It also provides with Debian packages.


OS X
----

We support [homebrew][homebrew], a package manager for OSX. To install
dReal, run the following scripts on a terminal:

{% highlight bash %}
brew tap dreal/dreal
brew install dreal
{% endhighlight %}


To upgrade dReal to the latest version, run:

{% highlight bash %}
brew upgrade dreal
{% endhighlight %}

[homebrew]: http://brew.sh/


Binary Releases
===============

Please visit our [releases page at Github](https://github.com/dreal/dreal3/releases).


Source Code
===========

You can download
[the source code of dReal](http://github.com/dreal/dreal3/archive/master.zip).
Please read the following instructions to build dReal:

 - [Build instructions for Ubuntu 12.04 / 14.04](https://github.com/dreal/dreal3/blob/master/doc/ubuntu-gcc.md)
 - [Build instructions for OS X 10.9 / 10.10](https://github.com/dreal/dreal3/blob/master/doc/osx-gcc.md)
