---
layout: archive
title: "Networked Thermostat Model"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---


We consider a network of classical thermostat hybrid automata.
A number of rooms are interconnected by open doors.
The temperature of each room is separately controlled by its own
thermostat controller that turns the heater on and off.

## Dynamics

The temperature of each room depends on
the mode \\(m \in \\{on, off\\}\\) of the heater  and the temperatures of the other rooms.
E.g., for three rooms \\(I = \\{0,1,2\\}\\), 
the temperature \\(x_i\\) of room \\(i \in I\\)
changes according to the ordinary differential equations:


\begin{aligned}
\dot{x}_i &= K_i (h_i - ((1- 2 c) x_i + c x\_{i-1} + c x\_{i+1})) &&\mbox{if}\; m_i = m\_\texttt{on}
\\\\\\
\dot{x}_i &= - K_i ((1- 2 c) x_i + c x\_{i-1} + c x\_{i+1}) && \mbox{if}\; m_i = m\_\texttt{off}
\end{aligned}

where 
\\(K_i, h_i \in \mathbb{R}\\) are constants depending on
the size of room \\(i\\) and the heater's power, respectively,
and \\(c \in \mathbb{R}\\) is determined by the size of the open door.


In this model,
every thermostat controller synchronously performs its transitions
for each period \\(T = 1\,\mathrm{s}\\).
In each transition, a controller turns on the heater 
 if \\(x_i \leq T_m\\),
and turns it  off if \\(x_i > T_M\\).

The safety property is that the temperature of each room
is in the range \\(I = [T_m - \eta, T_M + \eta]\\)
for a certain \\(\eta > 0 \\).
That is, \\(\mathit{safe}(T_M,T_m,\eta) = \wedge_i x_i \in I\\)


## Bounded Reachability

We first consider the cases of networks of two and three thermostats
with the parameters
\\(K_1 = 0.015\\), 
\\(K_2 = 0.045\\), 
\\(K_3 = 0.03\\), 
\\(h_1 = 100\\),
\\(h_2 = 200\\),
\\(h_3 = 300\\),
\\(k_1^2 = k_2^1 = 0.01\\),
\\(k_2^3 = k_3^2 = 0.05\\) and
\\(k_1^3 = k_3^1 = 0.02\\).

We have performed bounded model checking up to \\(k = 5\\)
from the initial condition \\(\wedge_i 19 < x_i < 21\\),
for \\(\mathit{safe}_t = \mathit{safe}(20,20,5)\\) 
(the reachability of \\(\neg\mathit{safe}_t\\) unsat)
and \\(\mathit{safe}_f = \mathit{safe}(20,20,1)\\) 
(the reachability of \\(\neg\mathit{safe}_f\\) sat)
using a vertion 2 of **dReal**.
We set a timeout of 30 hours for the experiments.



|----------------------------|---------|----------|-----------|-----------|-----------|
|Benchmark (BMC)             | k=1     | k=2      | k=3       | k=4       | k=5       |
|----------------------------|---------|----------|-----------|-----------|-----------|
|Double (Unsat) (new)        | 0.12 s  | 0.85 s   | 6.10 s    | 121.94 s  | 907.71 s  |
|Double (Unsat) (heuristics) | 0.55 s  | 3.84 s   | 27.44 s   | 169.61 s  | 1211.51 s |
|Double (Unsat) (standard)   | 0.99 s  | 246.73 s | 13448.89 s| -         | -         |
|----------------------------|---------|----------|-----------|-----------|-----------|
|Double (Sat)   (new)        | 0.46 s  | 1.73 s   | 9.40 s    | 76.60 s   | 586.66 s  |
|Double (Sat)   (heuristics) | 0.67 s  | 3.37 s   | 20.73 s   | 145.34 s  | 1114.85 s |
|Double (Sat)   (standard)   | 1.24 s  | 273.95 s | 8059.73 s | -         | -         |
|----------------------------|---------|----------|-----------|-----------|-----------|
|Triple (Unsat) (new)        | 1.22 s  | 34.50 s  | 816.71 s  | 7651.68 s | 74980.37 s|
|Triple (Unsat) (heuristics) | 2.59 s  | 48.27 s  | 812.33 s  | 11038.87 s| -         |
|Triple (Unsat) (standard)   | 552.68 s| -        | -         | -         | -         |
|----------------------------|---------|----------|-----------|-----------|-----------|
|Triple (Sat)   (new)        | 1.68 s  | 13.51 s  | 63.20 s   | 2785.33 s | 70303.00 s|
|Triple (Sat)   (heuristics) | 3.45 s  | 43.78 s  | 724.19 s  | 10757.28 s| -         |
|Triple (Sat)   (standard)   | 236.95 s| -        | -         | -         | -         |
|----------------------------|---------|----------|-----------|-----------|-----------|


#### Files

To generate SMT files for this model in the new/standard encodings, we have developed a simple python script.
For example, 
for the unsat case of the double thermostat model with bound \\(k = 2\\),
we can run the following commands to generate the SMT file using the new encoding and check its satisfiability using **dReal**
provided that the library file [gen.py](../gen.py) is in the same directory:

```
python thermostat-double-p.py 2 > thermostat-double-p_2.smt2
dReal thermostat-double-p_2.smt2
```

For the **dReach** scripts, we use the option  `-k N -l N` to set both lower and upper bound to \\(N\\).
For example, for the double thermostat dReach model, we can set \\(N = 2\\) using the following command:

```
dReach -k 2 -l 2 thermostat-double.drh
```

The following are the python scripts (to generate SMT files) and the dReach models for the 
networked thermostat models.

* SMT generation script: [gen.py](../gen.py)
* Two networked thermostats
    * Unsat:  [New encoding](thermostat-double-p.py),
              [Standard encoding](thermostat-double.py), 
              [dReach script](thermostat-double.drh)
    * Sat:    [New encoding](thermostat-double-p-sat.py),
              [Standard encoding](thermostat-double-sat.py), 
              [dReach script](thermostat-double-sat.drh)

* Three networked thermostats
    * Unsat:  [New encoding](thermostat-triple-p.py),
              [Standard encoding](thermostat-triple.py), 
              [dReach script](thermostat-triple.drh)
    * Sat:    [New encoding](thermostat-triple-p-sat.py),
              [Standard encoding](thermostat-triple-sat.py), 
              [dReach script](thermostat-triple-sat.drh)



## Inductive analysis

We have performed 
inductive analysis 
to verify that the property \\(\mathit{safe}(20,20,9)\\)
holds at the end \\(\tau > 0.99\\) of each period.

|----------------------------|---------|----------|
|Benchmark (Inductive)       | new     | standard |
|----------------------------|---------|----------|
|Double                      | 2.23 s  | 215.15 s |
|----------------------------|---------|----------|
|Triple                      | 91.65 s | -        |
|----------------------------|---------|----------|

#### Files

The same python scripts are used with \\(k = 1\\) for inductive analysis.
The following are the python scripts (to generate SMT files) for the 
networked thermostat models.

* Two networked thermostats
    * Inductive: [New encoding](thermostat-double-ind-p.py),
                 [Standard encoding](thermostat-double-ind.py)

* Three networked thermostats
    * Inductive: [New encoding](thermostat-triple-ind-p.py),
                 [Standard encoding](thermostat-triple-ind.py)


## Compositional analysis

We have then verified the safety property \\(\forall t.\; x_i \in I\\)
for  any number of interconnected thermostat controllers
by inductive and compositional analysis.
For a subinterval 
\\(I' = [T_m - \eta', T_M + \eta']\subseteq I\\),
provided that both \\(x\_{i-1} \in I\\) and \\(x\_{i+1} \in I\\) always hold,
we show that \\(x_i \in I'\\) is an inductive condition,
and \\(x_i \in I\\) always holds
if \\(x_i \in I'\\) at the beginning of each round.

In this analysis, we also take into account local clock skews (bounded by \\(\epsilon > 0 \\), input sampling time \\(t_I\\), and actuator response time \\(t_R\\) for each thermostats. That is, each controller begins its \\(i\\)-th period at time \\(u_0 \in (iT - \epsilon, iT + \epsilon)\\),
reads the current temperature at time \\(u_0 + t_I\\), and changes the switch of the thermostat at time \\(u_0 + t_R\\). 

We have used the parameters 
\\(K = 0.015\\), 
\\(h = 100\\),
\\(c = 0.01\\),
\\(T_M = 21\\), 
\\(T_m = 19\\),
\\(\eta = 3\\), and
\\(\eta' = 2\\).
For \\(\epsilon = 2\,\mathrm{ms}\\),
\\(t_I = 10\,\mathrm{ms}\\),
and \\(t_R = 200\,\mathrm{ms}\\),
we have proved the compositional safety property 
for any number of thermostats,
in 2.6 seconds using **dReal3** with precision \\(\delta = 0.001\\).
 

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

* [compositional condition](thermostat-comp-OK.smt2)
* [sampling stage](thermostat-comp-OK_1_0.smt2) 
* [response stage](thermostat-comp-OK_2_0.smt2)
* [wait stage](thermostat-comp-OK_3_0.smt2)
* [compositional counterexample](thermostat-comp-ERR.smt2)



