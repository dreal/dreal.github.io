Title:    Repeatability Evaluation for Paper 92
Author:   Soonho Kong, Kyungmin Bae, Sicun Gao
Date:     January 22, 2016
css: tufte.css
HTML header: <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

# Repeatability Evaluation for Paper 92

This document explains the steps to reproduce the results that we
reported in our submission to HSCC'16, "SMT-Based Analysis of
Virtually Synchronous Distributed Hybrid Systems" written by
[Kyungmin Bae][kyungmin], [Peter Olveczky][peter],
[Soonho Kong][soonho], and [Sicun Gao][sicun].

[kyungmin]: http://www.cs.cmu.edu/~kbae
[peter]: http://folk.uio.no/peterol
[soonho]: http://www.cs.cmu.edu/~soonhok
[sicun]: https://scungao.github.io


## Elements of the paper are included in the RP

There are three case studies in Section 6 of our paper -- "Turning an
Airplane" (Section 6.1), "Networked Water Tank Controllers" (Section
6.2), and "Networked Thermostat Controllers" (Section 6.3). This RP
covers four experiments in Section 6.1, five experiments in Section
6.2, and five experiments in Section 6.3.

## The system requirements for running the RP

We support 64-bit Linux and OSX. To compile the source code, it
requires a C++11-compatible compiler such as g++ (>= 4.8) and clang++
(>= 3.3). For Ubuntu and OSX users, we provide them with pre-compiled
binary packages which can be installed with a few commands. The source
code of dReal/dReach tools are available at
[https://github.com/dreal/dreal3](https://github.com/dreal/dreal3)
under GPL3 license.


## Instructions for installing and running the software

On Ubuntu systems, run the following commands at a terminal to install
dReal/dReach:

```bash
sudo apt-get install -y python-software-properties  # only for 12.04 to have add-apt-repository
sudo add-apt-repository -y ppa:dreal/dreal
sudo add-apt-repository -y ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install -y dreal
```

On OSX systems, run the following commands at a terminal to install
dReal/dReach. Here, we assume that you are using
[homebrew](http://brew.sh/), a wide-used package management system for
OSX.

```bash
brew tap dreal/dreal    # tap to github.com/dreal/homebrew-dreal
brew update
brew install dreal
```

## Instructions for extracting the corresponding results

First, please download
[this archive file](/HSCC16_RE/hscc_re.tar.gz)
which provides the data files required to reproduce our experiments in
the paper. Uncompressing the archive file, you will see the three
subdirectories -- `airplane` (for section 6.1), `water` (for section
6.2), `thermo` (for section 6.3) under HSCC_RE_92 directory.


### Section 6.1 Turning an Airplane

Experiment 1: BMC for $abs(\beta(t)) \le 0.2$ for 10 steps (the entire
model). Run the following command:

```bash
dReach -k 10 airplane-nl.drh
```

Experiment 2: BMC for $abs(\beta(t)) \le 0.2$ for 20 steps (the main
controller only), provided the compositional assumptions on the
ailerons and rudder. Run the following command:

```bash
dReach -k 20 airplane-main.drh
```

Experiment 3: If $abs(g_L−v_L) < 0.03$ at the beginning of the period,
then $abs(g_L−x_L) < 0.05$ during the period for the aileron. Run the following command:

```bash
dReach -k 2 airplane-ail.drh
```
Experiment 4: If $abs(g_L−v_L) < 0.03$ at the beginning of the period,
then $abs(g_L−x_L) < 0.03$ again at the end of the period. Run the following command:

```bash
dReach -k 2 airplane-ail-ind.drh
```

### Section 6.2 Networked Water Tank Controllers

Experiment 1:
If $x_i \in I'$ at the beginning of each period, then $x_i \in I'$ at the
end of the period, provided that $x_{i−1}$, $x_{i+1} \in I$ always holds,
where $\epsilon = 0.003$. Run the following command:

```bash
dReal --precision 0.003 water-comp-OK.smt2
```

Experiment 2: If $x_i \in I'$ at the beginning of each round, then $x_i
\in I$ always holds for sampling stage.  Run the following command:

```bash
dReal water-comp-OK_1_0.smt2
```

Experiment 3: If $x_i \in I'$ at the beginning of each round, then $x_i
\in I$ always holds for response stage.  Run the following command:

```bash
dReal water-comp-OK_2_0.smt2
```

Experiment 4: If $x_i \in I'$ at the beginning of each round, then $x_i
\in I$ always holds for wait stage.
Run the following command:

```bash
dReal water-comp-OK_3_0.smt2
```

Experiment 5:
Find counterexample for the condition of `water-comp-OK.smt2`, when $\epsilon = 0.15$.
Run the following command:

```bash
dReal --precision 0.15  water-comp-ERR.smt2
```


### Section 6.3 Networked Thermostat Controllers

Experiment 1: if $x_i \in I'$ at the beginning of each period, then $x_i
\in I'$ at the end of the period, provided that $x_{i−1}, x_{i+1} \in I$
always holds, where $\epsilon = 0.002$. Run the following command:

```bash
dReal --precision 0.002 thermostat-comp-OK.smt2
```

Experiment 2: If $x_i \in I'$ at the beginning of each round, then $x_i
 \in I$ always holds for sampling stage. Run the following command:

```bash
dReal thermostat-comp-OK_1_0.smt2
```

Experiment 3: If $x_i \in I'$ at the beginning of each round, then $x_i
\in I$ always holds for response stage. Run the following command:

```bash
dReal thermostat-comp-OK_2_0.smt2

```

Experiment 4: If $x_i \in I'$ at the beginning of each round, then $x_i
\in I$ always holds for wait stage.  Run the following command:

```bash
dReal thermostat-comp-OK_3_0.smt2
```

Experiment 5: Find a counterexample for the condition of
thermostat-comp-OK.smt2, when $\epsilon = 0.02$.  Run the following
command:

```bash
dReal --precision 0.02 thermostat-comp-ERR.smt2
```
