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
The water level \\(x_i\\) of tank \\(i\\) changes according to the differential equations:


![Differential-equations](water.png)

where \\(A_i, q_i, a\\) are constants determined by the size of the tank, the power of the pump, 
and the width of the pipe,


Every pipe controller synchronously performs its discrete transitions:
for each second,
the pump is on if \\(x_i \leq L_m\\), and off if \\(x_i > L_M\\).
There is also a shared timer variable \\(\tau\\)
with the flow condition \\(\dot{\tau} = 1\\) to keep track of each one-second period.


## Benchmarks

We consider the cases of networks of two and three water tanks
with the parameters
\\(a = 0.5\\),
\\(g = 9.8\\),
\\(A_1 = 2\\), 
\\(A_2 = 4\\), 
\\(A_3 = 3\\), 
\\(q_1 = 5\\),
\\(q_2 = 3\\),
\\(q_3 = 4\\),
\\(L_m = L_M = 5\\),
and the initial condition \\(\wedge_i 4.9 < x_i < 5.1\\).
We have performed bounded model checking up to \\(k = 5\\)
for the properties \\(\mathit{safe}_t = \wedge_i 3 < x_i < 7\\) 
(the reachability of \\(\neg\mathit{safe}_t\\) unsat)
and \\(\mathit{safe}_f = \wedge_i 4.9 < x_i < 5.1\\)
(the reachability of \\(\neg\mathit{safe}_f\\) sat).

We have performed 
inductive analysis 
to verify that the property \\(\mathit{safe} = \wedge_{i} 1 < x_i < 9\\)
holds at the end \\(\tau > 0.99\\) of each period.
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



|----------------------------|---------|----------|
|Benchmark (Inductive)       | new     | standard |
|----------------------------|---------|----------|
|Double                      | 7.52 s  | 180.19 s |
|----------------------------|---------|----------|
|Triple                      |  47.10s | -        |
|----------------------------|---------|----------|



## Files

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

The following are the python scripts (to generate SMT files) and the dReach models for the 
networked water tank models

* SMT generation script: [gen.py](../gen.py)
* Two networked water tanks
    * Unsat:  [New encoding](water-double-p.py),
              [Standard encoding](water-double.py), 
              [dReach script](water-double.drh)
    * Sat:    [New encoding](water-double-p-sat.py),
              [Standard encoding](water-double-sat.py), 
              [dReach script](water-double-sat.drh)
    * Inductive: [New encoding](water-double-ind-p.py),
                 [Standard encoding](water-double-ind.py)

* Three networked water tanks
    * Unsat:  [New encoding](water-triple-p.py),
              [Standard encoding](water-triple.py), 
              [dReach script](water-triple.drh)
    * Sat:    [New encoding](water-triple-p-sat.py),
              [Standard encoding](water-triple-sat.py), 
              [dReach script](water-triple-sat.drh)
    * Inductive: [New encoding](water-triple-ind-p.py),
                 [Standard encoding](water-triple-ind.py)


