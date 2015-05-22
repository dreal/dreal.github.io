---
layout: archive
title: "Multiple Battery Usage"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

There are two fully charged batteries, and a control system 
switches load between these batteries to achieve longer lifetime
out of the batteries.
Each battery \\(i\\) involves three modes \\(switchedOn\\), \\(switchedOff\\), 
and \\(dead\\).

## Dynamics

The dynamics of the battery charge is expressed by the following differential equations 
for different modes:

\begin{equation}
(\mbox{on})
\left[
\begin{aligned}
\dot{d}_i &= L / c  - k \cdot d_i
\\\\\\
\dot{g}_i &= - L
\end{aligned}
\right],
\qquad
(\mbox{off})
\left[
\begin{aligned}
\dot{d}_i &= - k \cdot d_i
\\\\\\
\dot{g}_i &= 0
\end{aligned}
\right],
\qquad
(\mbox{dead})
\left[
\begin{aligned}
\dot{d}_i &= 0
\\\\\\
\dot{g}_i &= 0
\end{aligned}
\right],
\end{equation}


with variable \\(d_i\\) its kinetic energy difference,
variable \\(g_i\\) its total charge,
constant \\(L \in \mathbb{R}\\) its load,
and constant \\(c \in [0,1]\\) its threshold.
If \\(g_i > (1 - c) d_i\\),
then battery \\(i\\) is dead.
If battery \\(i\\) is not dead,
then it can be either on or off.
When both batteries are on, 
then load to each battery is divided by \\(2\\).
There is a timer variable \\(\tau\\)
with the flow condition \\(\dot{\tau} = 1\\)
to keep track of the elapsed time.



## Benchmarks

We consider the cases of networks of two batteries
with the parameters
\\(k = 0.122\\)
and
\\(c = 0.166\\),
and the initial condition \\(g_1 = 8.5 \;\wedge\; d_1 = 0 \;\wedge\; g_2 = 7.5 \;\wedge\; d_2 = 0\\).
We have performed bounded model checking up to \\(k = 5\\)
for the properties \\(\mathit{safe}_t = \tau > 10 \\) 
(the reachability of \\(\neg\mathit{safe}_t\\) unsat)
and \\(\mathit{safe}_f = \tau > 0\\)
(the reachability of \\(\neg\mathit{safe}_f\\) sat).
We set a timeout of 30 hours for the experiments.


|----------------------|----------|----------|-----------|-----------|-----------|
|Benchmark (BMC)       | k=1      | k=2      | k=3       | k=4       | k=5       |
|----------------------|----------|----------|-----------|-----------|-----------|
| (Unsat) (new)        | 0.16 s   | 1.63 s   | 32.66 s   | 1027.05 s | 18296.20 s|
| (Unsat) (heuristics) | 0.36 s   | 4.43 s   | 63.02 s   | 1019.79 s | 14842.02 s|
| (Unsat) (standard)   | 4.24 s   | 1028.82 s| -         | -         | -         |
|----------------------|----------|----------|-----------|-----------|-----------|
| (Sat)   (new)        | 0.46 s   | 1.74 s   | 6.85 s    | 12.87 s   | 72.60 s   |
| (Sat)   (heuristics) | 0.53 s   | 2.04 s   | 8.20 s    | 13.46 s   | 91.36 s   |
| (Sat)   (standard)   | 0.99 s   | 2.22 s   | 9.49 s    | 22.99 s   | 44.22 s   |
|----------------------|----------|----------|-----------|-----------|-----------|


## Files

To generate SMT files for this model in the new/standard encodings, we have developed a simple python script.
For example, 
for the unsat case with bound \\(k = 2\\),
we can run the following commands to generate the SMT file using the new encoding and check its satisfiability using **dReal**
provided that the library file [gen.py](../gen.py) is in the same directory:

```
python battery-double-p.py 2 > battery-double-p_2.smt2
dReal battery-double-p_2.smt2
```

For the **dReach** scripts, we use the option  `-k N -l N` to set both lower and upper bound to \\(N\\).
For example, we can set \\(N = 2\\) using the following command:

```
dReach -k 2 -l 2 battery-double.drh
```

The following are the python scripts (to generate SMT files) and the dReach models.


* SMT generation script: [gen.py](../gen.py)
* Unsat:  [New encoding](battery-double-p.py),
          [Standard encoding](battery-double.py), 
          [dReach script](battery-double.drh)
* Sat:    [New encoding](battery-double-p-sat.py),
          [Standard encoding](battery-double-sat.py), 
          [dReach script](battery-double-sat.drh)
