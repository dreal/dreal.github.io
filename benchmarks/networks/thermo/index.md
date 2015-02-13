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
A number of rooms are interconnected by open doors,
and the temperature of each room is separately controlled by each thermostat
that turns its heater on and off.

## Dynamics

The temperature of each room depends on
the mode \\(m \in \\{on, off\\}\\) of the heater  and the temperatures of the other rooms.
E.g., for three rooms \\(I = \\{0,1,2\\}\\), 
the temperature \\(x_i\\) of room \\(i \in I\\)
changes according to the differential equations:

![Differential-equations](thermo.png)

where \\(K_i, h_i \in \mathbb{R}\\) are constants depending on
the size of room \\(i\\) and the power of the heater, respectively,
and \\(k_i^j \in \mathbb{R}\\) is determined by the size of the open door between rooms \\(i\\) and \\(j\\).


In this model,
every thermostat controller synchronously performs its discrete transitions.
For each second, 
the heater is turned on if \\(x_i \leq T_m\\),
and turned off if \\(x_i > T_M\\).
To keep track of each one-second period,
every automaton has a *shared* timer variable \\(\tau\\)
with the flow condition \\(\dot{\tau} = 1\\).


## Benchmarks

We consider the cases of networks of two and three thermostats
with the parameters
\\(K_1 = 0.015\\), 
\\(K_2 = 0.045\\), 
\\(K_3 = 0.03\\), 
\\(h_1 = 100\\),
\\(h_2 = 200\\),
\\(h_3 = 300\\),
\\(k_1^2 = k_2^1 = 0.01\\),
\\(k_2^3 = k_3^2 = 0.05\\),
\\(k_1^3 = k_3^1 = 0.02\\),
\\(T_m = T_M = 20\\),
and the initial condition \\(\wedge_i 19 < x_i < 21\\).
We have performed bounded model checking up to \\(k = 5\\)
for \\(\mathit{safe}_t = \wedge_i 15 < x_i < 25\\) 
(the reachability of \\(\neg\mathit{safe}_t\\) unsat)
and \\(\mathit{safe}_f = \wedge_i 19 < x_i < 21\\) 
(the reachability of \\(\neg\mathit{safe}_f\\) sat).

We have also performed 
inductive analysis 
to verify that the property \\(\mathit{safe} = \wedge_{i} 11 < x_i < 29\\)
holds at the end \\(\tau > 0.99\\) of each period.
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


|----------------------------|---------|----------|
|Benchmark (Inductive)       | new     | standard |
|----------------------------|---------|----------|
|Double                      | 2.23 s  | 215.15 s |
|----------------------------|---------|----------|
|Triple                      | 91.65 s | -        |
|----------------------------|---------|----------|



## Files

To generate SMT files for this model in the new/standard encodings, we have developed a simple python script.
For example, 
for the unsat case of the double thermostat model with bound \\(k = 2\\),
we can run the following commands to generate the SMT file using the new encoding and check its satisfiability using **dReal**
provided that the library file [gen.py](../gen.py) is in the same directory:

```
python thermostat-double-p.py 2 > thermostat-double-p_2.smt2
dReal thermostat-double-p_2.smt2
```

(Note that \\(k = 1\\) is used for inductive analysis).
For the **dReach** scripts, we use the option  `-k N -l N` to set both lower and upper bound to \\(N\\).
For example, for the double thermostat dReach model, we can set \\(N = 2\\) using the following command:

```
dReach -k 2 -l 2 thermostat-double.drh
```

The following are the python scripts (to generate SMT files) and the dReach models for the 
networked thermostat models

* SMT generation script: [gen.py](../gen.py)
* Two networked thermostats
    * Unsat:  [New encoding](thermostat-double-p.py),
              [Standard encoding](thermostat-double.py), 
              [dReach script](thermostat-double.drh)
    * Sat:    [New encoding](thermostat-double-p-sat.py),
              [Standard encoding](thermostat-double-sat.py), 
              [dReach script](thermostat-double-sat.drh)
    * Inductive: [New encoding](thermostat-double-ind-p.py),
                 [Standard encoding](thermostat-double-ind.py)

* Three networked thermostats
    * Unsat:  [New encoding](thermostat-triple-p.py),
              [Standard encoding](thermostat-triple.py), 
              [dReach script](thermostat-triple.drh)
    * Sat:    [New encoding](thermostat-triple-p-sat.py),
              [Standard encoding](thermostat-triple-sat.py), 
              [dReach script](thermostat-triple-sat.drh)
    * Inductive: [New encoding](thermostat-triple-ind-p.py),
                 [Standard encoding](thermostat-triple-ind.py)


