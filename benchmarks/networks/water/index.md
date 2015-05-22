---
layout: archive
title: "Networked Water Tank Controllers"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---


A number of water tanks are connected by pipes,
and the water level in each tank is separately controlled by the pump in the tank,
which can be turned on or off.



## Dynamics

The water level of each tank depends on the mode \\(m \in \\{on, off\\}\\)
of the tank and the levels of the adjacent tanks.
The water level \\(x_i\\) of tank \\(i\\) changes according to the ordinary differential equations:

\begin{aligned}
A_i \dot{x}_i &=  (q_i + a \sqrt{2g} \sqrt{x\_{i-1}})  - b \sqrt{2g} \sqrt{x_i}
&& \mbox{if}\;\; m_i = m\_\texttt{on},
\\\\\\
A_i \dot{x}_i &= a \sqrt{2g} \sqrt{x\_{i-1}}  - b \sqrt{2g} \sqrt{x_i}
&& \mbox{if}\;\; m_i = m\_\texttt{off},
\end{aligned}


where \\(A_i, q_i, a, b\\) are constants determined by the size of the tank, the power of the pump, 
the width of the I/O pipe,
and \\(g\\) is the standard gravity constant.
We set \\(x_0 = 0\\) for the leftmost tank $1$.

Every pipe controller performs its transitions for each period \\(T = 1\,\mathrm{s}\\) according to its local clock and sets  the pump to on if \\(x_i \leq L_m\\) and to off if \\(x_i > L_M\\).


The safety property is that the water level of each tank is in a certain range
\\(I = [L_m - \eta, L_M + \eta]\\) with \\(\eta > 0\\).
That is \\(\mathit{safe}(L_M,L_m,\eta) = \wedge_i x_i \in I\\).



## Bounded Reachability

We first consider the cases of networks of two and three water tanks
with the parameters
\\(a = b = 0.5\\),
\\(g = 9.8\\),
\\(A_1 = 2\\), 
\\(A_2 = 4\\), 
\\(A_3 = 3\\), 
\\(q_1 = 5\\),
\\(q_2 = 3\\), and
\\(q_3 = 4\\).

We have performed bounded model checking up to \\(k = 5\\)
from the initial condition \\(\wedge_i 4.9 < x_i < 5.1\\)
for the properties \\(\mathit{safe}_t = \mathit{safe}(5,5,2)\\) 
(the reachability of \\(\neg\mathit{safe}_t\\) unsat)
and \\(\mathit{safe}_f = \mathit{safe}(5,5,0.1)\\)
(the reachability of \\(\neg\mathit{safe}_f\\) sat),
 using a vertion 2 of **dReal**. 
We set a timeout of 30 hours for the experiments.


|----------------------------|----------|----------|-----------|-----------|-----------|
|Benchmark (BMC)             | k=1      | k=2      | k=3       | k=4       | k=5       |
|----------------------------|----------|----------|-----------|-----------|-----------|
|Double (Unsat) (new)        | 0.37 s   | 1.48 s   | 8.33 s    | 94.66 s   | 1098.63 s |
|Double (Unsat) (heuristics) | 0.54 s   | 2.15 s   | 14.98 s   | 124.28 s  | 1278.40 s |
|Double (Unsat) (standard)   | 1.24 s   | 317.22 s | 22688.95 s| -         | -         |
|----------------------------|----------|----------|-----------|-----------|-----------|
|Double (Sat)   (new)        | 1.12 s   | 2.40 s   | 5.36 s    | 16.40 s   | 64.99 s   |
|Double (Sat)   (heuristics) | 1.52 s   | 3.13 s   | 11.57 s   | 57.68 s   | 140.64 s  |
|Double (Sat)   (standard)   | 2.62 s   | 38.19 s  | 6771.18 s | -         | -         |
|----------------------------|----------|----------|-----------|-----------|-----------|
|Triple (Unsat) (new)        | 1.18 s   | 29.74 s  | 851.47 s  | 11736.80 s| 93326.38 s|
|Triple (Unsat) (heuristics) | 1.81 s   | 31.76 s  | 729.93 s  | 11228.41 s| -         |
|Triple (Unsat) (standard)   | 786.58 s | -        | -         | -         | -         |
|----------------------------|----------|----------|-----------|-----------|-----------|
|Triple (Sat)   (new)        | 2.59 s   | 7.60 s   | 165.07 s  | 383.52 s  | 14373.01 s|
|Triple (Sat)   (heuristics) | 5.67 s   | 28.87 s  | 360.23 s  | 4630.00 s | 68224.44 s|
|Triple (Sat)   (standard)   | 1062.09 s| -        | -         | -         | -
|----------------------------|----------|----------|-----------|-----------|-----------|

#### Files

To generate SMT files for this model in the new/standard encodings, we have developed a simple python script.
For example, 
for the unsat case of the double water tank model with bound \\(k = 2\\),
we can run the following commands to generate the SMT file using the new encoding and check its satisfiability using **dReal**
provided that the library file [gen.py](../gen.py) is in the same directory:

```
python water-double-p.py 2 > water-double-p_2.smt2
dReal water-double-p_2.smt2
```

For the **dReach** scripts, we use the option  `-k N -l N` to set both lower and upper bound to \\(N\\).
For example, for the double water tank dReach model, we can set \\(N = 2\\) using the following command:

```
dReach -k 2 -l 2 water-double.drh
```

The following are the python scripts (to generate SMT files) and the dReach models for the networked water tank models.

* SMT generation script: [gen.py](../gen.py)
* Two networked water tanks
    * Unsat:  [New encoding](water-double-p.py),
              [Standard encoding](water-double.py), 
              [dReach script](water-double.drh)
    * Sat:    [New encoding](water-double-p-sat.py),
              [Standard encoding](water-double-sat.py), 
              [dReach script](water-double-sat.drh)

* Three networked water tanks
    * Unsat:  [New encoding](water-triple-p.py),
              [Standard encoding](water-triple.py), 
              [dReach script](water-triple.drh)
    * Sat:    [New encoding](water-triple-p-sat.py),
              [Standard encoding](water-triple-sat.py), 
              [dReach script](water-triple-sat.drh)



## Inductive analysis


We have performed 
inductive analysis 
to verify that the property \\(\mathit{safe}(5,5,4)\\)
holds at the end \\(\tau > 0.99\\) of each period.



|----------------------------|---------|----------|
|Benchmark (Inductive)       | new     | standard |
|----------------------------|---------|----------|
|Double                      | 7.52 s  | 180.19 s |
|----------------------------|---------|----------|
|Triple                      |  47.10s | -        |
|----------------------------|---------|----------|



#### Files


The same python scripts are used with \\(k=1\\) for inductive analysis. The following are the python scripts (to generate SMT files) for the 
networked water tank models.

* Two networked water tanks
    * Inductive: [New encoding](water-double-ind-p.py),
                 [Standard encoding](water-double-ind.py)

* Three networked water tanks
    * Inductive: [New encoding](water-triple-ind-p.py),
                 [Standard encoding](water-triple-ind.py)

## Compositional analysis


We have verified this safety property for  \emph{any number} of connected water tanks using inductive and compositional analysis.
For a tank $k$ and a subinterval 
\\(I' = [L_m - \eta', L_M + \eta']\subseteq I\\) with \\(\eta' < \eta\\),
provided  that \\(x\_{k-1} \in I\\) always holds for its input tank  \\(k-1\\),
we show that \\(x_{k} \in I'\\) is an inductive condition,
and  \\(x_{k} \in I\\) always holds
if \\(x_{k} \in I'\\) at the beginning of each round.

In this analysis, we also take into account local clock skews (bounded by \\(\epsilon > 0 \\), input sampling time \\(t_I\\), and actuator response time \\(t_R\\) for each water tank controller. That is, each controller begins its \\(i\\)-th period at time \\(u_0 \in (iT - \epsilon, iT + \epsilon)\\),
reads the current water level at time \\(u_0 + t_I\\), and changes the status of the pipe at time \\(u_0 + t_R\\). 


We have used the parameters 
\\(a = 1.5\\), 
\\(b = 0.6\\), 
\\(g = 9.8\\),
\\(A = 2\\), 
\\(q = 4\\), 
\\(L_m = 8\\), 
\\(L_M = 10\\), 
\\(\eta = 3\\), and 
\\(\eta' = 2\\).
For  maximal clock skew \\(\epsilon = 30\,\mathrm{ms}\\),
 sampling time \\(t_I = 20\,\mathrm{ms}\\),
and  response time \\(t_R = 100\,\mathrm{ms}\\),
we have proved the  compositional safety property
for any number of water tanks,
in 4.3 seconds using version 3 of **dReal** 
with precision \\(\delta = 0.001\\). 


#### Files

The following SMT2 files contains the SMT formulas used for the compositional analysis. Both are negated formulas for compositional conditions, and we check the unsatisfiability of those formulas.

The first SMT file contains the negation of 
the formula stating that if \\(x_k \in I'\\) at the beginning of each period,
then \\(x_k \in I'\\) at the end of the period,
provided that both \\(x\_{i-1} \in I\\) and \\(x\_{i+1} \in I\\) always hold
(given by user-defined precision in **dReal3**).
The following three SMT files contain
the negations of the formulas stating
that \\(x_i \in I\\) always holds
for each stage if \\(x_i \in I'\\) at the beginning of each round.
The last SMT2 file shows an counterexample of the compositional condition when \\(\epsilon = 150\,\mathrm{ms}\\).

* [compositional condition](water-comp-OK.smt2)
* [sampling stage](water-comp-OK_1.smt2) 
* [response stage](water-comp-OK_2.smt2)
* [wait stage](water-comp-OK_3.smt2)
* [compositional counterexample](water-comp-ERR.smt2)
