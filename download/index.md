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

---

Linux (Ubuntu 14)
-----------------

We provide a PPA for Ubuntu 12.04 LTS (precise) and Ubuntu 14.04. On
those systems, run the following scripts on a terminal to install
dReal:

{% highlight bash %}
sudo add-apt-repository ppa:dreal/dreal
sudo apt-get install dreal
{% endhighlight %}

To upgrade dReal to the latest version, run:
{% highlight bash %}
sudo apt-get update
sudo apt-get upgrade dreal
{% endhighlight %}

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

Please visit our [releases page at Github](https://github.com/dreal/dreal/releases).

Source Code
===========

You can download
[the source code of dReal](http://github.com/dreal/dreal/archive/master.zip).
Please read the following instructions to build dReal:

 - [Build instructions for Ubuntu 12.04 / 14.04](https://github.com/dreal/dreal/blob/master/doc/ubuntu-gcc.md)
 - [Build instructions for OS X 10.9 / 10.10](https://github.com/dreal/dreal/blob/master/doc/osx-gcc.md)
