---
layout: archive
title: "Airplane Model"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---


We consider a networked control system to perform the turning maneuver of an airplane
in which a main controller directs subcontrollers for the ailerons and the rudder.

To make a turn, an aircraft rolls towards the direction of the turn
by moving its ailerons (surfaces attached to the end of the wings),
while its rudder (a surface attached to the vertical tail)
is used to counter adverse yaw (a yawing moment in the opposite direction caused by the rolling).

The system consists of three controllers. The main controller has one mode, and determines the desired control angles. 
The two subcontroller (for the ailerons and the rudder) have two modes for moving up or down their surfaces, 
and *gradually* change the surface angles according to the main controller.

## Benchmarks

We consider three variants of this model: 
a single-rate nonlinear model where every controller has a 0.5 period, 
a single-rate approximated model by linear differential equations, 
and a multirate linear model where the aileron controller has a 0.25 period and the rudder controller has a 0.5/3 period.
We set a timeout of 30 hours for the experiments.


|--------------------------------|--------|----------|-----------|---------|----------|
|Benchmark (BMC)                 | k=1    | k=2      | k=3       | k=4     | k=5      |
|--------------------------------|--------|----------|-----------|---------|----------|
|Simplified (Unsat) (new)        | 0.20 s | 3.12 s   | 27.34 s   | 188.36 s| 1406.45 s|
|Simplified (Unsat) (heuristics) | 0.45 s | 6.40 s   | 49.94 s   | 574.67 s| 3279.90 s|
|Simplified (Unsat) (standard)   | 1.84 s | 217.17 s | 21874.82 s| -       | -        |
|--------------------------------|--------|----------|-----------|---------|----------|
|Simplified (Sat)   (new)        | 0.56 s | 1.48 s   | 6.09 s    | 34.93 s | 457.75 s |
|Simplified (Sat)   (heuristics) | 0.89 s | 6.06 s   | 43.50 s   | 452.44 s| 2539.44 s|
|Simplified (Sat)   (standard)   | 1.24 s | 102.51 s | 14794.61 s| -       | -        |
|--------------------------------|--------|----------|-----------|---------|----------|
|Nonlinear  (Unsat) (new)        | 0.20 s | 11.69 s  | 90.06 s   | 555.16 s| 3187.93 s|
|Nonlinear  (Unsat) (heuristics) | 0.38 s | 4.71 s   | 33.09 s   | 401.27 s| 2465.69 s|
|Nonlinear  (Unsat) (standard)   | 1.82 s | 1022.98 s| -         | -       | -        |
|--------------------------------|--------|----------|-----------|---------|----------|
|Nonlinear  (Sat)   (new)        | 1.36 s | 7.09 s   | 113.90 s  | 428.86 s| 1468.34 s|
|Nonlinear  (Sat)   (heuristics) | 2.29 s | 9.29 s   | 41.76 s   | 375.38 s| 1767.21 s|
|Nonlinear  (Sat)   (standard)   | 3.12 s | 218.94 s | 50420.57 s| -       | -        |
|--------------------------------|--------|----------|-----------|---------|----------|


|--------------------------------|--------|-----------|----------|----------|-----------|
|Benchmark (BMC)                 | k=2    | k=4       | k=6      | k=8      | k=10      |
|--------------------------------|--------|-----------|----------|----------|-----------|
|Multirate  (Unsat) (new)        |0.82 s  | 29.14 s   | 382.83 s | 5359.49 s| 60918.94 s|
|Multirate  (Unsat) (heuristics) |1.28 s  | 35.83 s   | 389.34 s | 7687.09 s| 58087.00 s|
|Multirate  (Unsat) (standard)   |12.01 s | -         | -        | -        | -         |
|--------------------------------|--------|-----------|----------|----------|-----------|
|Multirate  (Sat)   (new)        |1.38 s  | 14.03 s   | 59.64 s  | 580.47 s | 834.44 s  |
|Multirate  (Sat)   (heuristics) |1.88 s  | 30.21 s   | 282.89 s | 5763.48 s| 43635.96 s|
|Multirate  (Sat)   (standard)   |2.75 s  | 40016.59 s| -        | -        | -         |
|--------------------------------|--------|-----------|----------|----------|-----------|



## Dynamics

We consider both nonlinear and linear systems of differential equations for this model.
The lateral dynamics of an aircraft
can be specified as nonlinear differential equations:


\begin{aligned}
    \frac{d\beta}{dt} = & \frac{Y(\beta,\delta_a,\delta_r)}{m V} - r + \frac{V}{g} \cos(\beta) \sin(\phi) \\\\\\
    \frac{dp}{dt} = & (c_1 r + c_2 p)\cdot r \tan(\phi) + c_3 L(\beta,\delta_a,\delta_r) + c_4 N(\beta,\delta_a,\delta_r) \\\\\\
    \frac{dr}{dt} = & (c_8 p - c_2 r) \cdot r \tan(\phi) + c_4 L(\beta,\delta_a,\delta_r) + c_9 N(\beta,\delta_a,\delta_r) \\\\\\
    \frac{d\phi}{dt} = & p \\\\\\
    \frac{d\psi}{dt} = & \frac{g}{V} \tan(\phi) \\\\\\
\end{aligned}


Assuming small perturbations, this system of nonlinear diferential equations can be approximated as the linear differential equations:


\begin{aligned}
    \frac{d\beta}{dt} = & Y_\beta \beta  - r + \frac{V}{g} \phi + Y_r \delta_r \\\\\\
    \frac{dp}{dt} = & L_b \beta + L_p p + L_r r + L_a \delta_a + L_r \delta_r  \\\\\\
    \frac{dr}{dt} = & N_b \beta + N_p p + N_r r + N_a \delta_a + N_r \delta_r  \\\\\\
    \frac{d\phi}{dt} = & p \\\\\\
    \frac{d\psi}{dt} = & \frac{g}{V} \phi \\\\\\
\end{aligned}


## Files

To generate SMT files for this model in the new/standard encodings, we have developed a simple python script.
For example, 
we can run the following commands 
to generate the SMT file using the new encoding and check its satisfiability using **dReal**
for the unsat case of the simplified airplane model with bound \\(k = 2\\),
provided that the library file [gen.py](../gen.py) is in the same directory:

```
python airplane-single-p.py 2 > airplane-single-p_2.smt2
dReal airplane-single-p_2.smt2
```

For the **dReach** scripts, we use the option  `-k N -l N` to set both lower and upper bound to \\(N\\).
For example, for the simplified airplane dReach model, we can set \\(N = 2\\) using the following command:

```
dReach -k 2 -l 2 airplane-single.drh
```

The following are the python scripts (to generate SMT files) and the dReach models for the three airplane models.

* SMT generation script: [gen.py](../gen.py)
* Nonlinear model
    * Unsat:  [New encoding](airplane-single-nl-p.py),
              [Standard encoding](airplane-single-nl.py), 
              [dReach script](airplane-single-nl.drh)
    * Sat:    [New encoding](airplane-single-nl-p-sat.py),
              [Standard encoding](airplane-single-nl-sat.py), 
              [dReach script](airplane-single-nl-sat.drh)
* Simplified model
    * Unsat:  [New encoding](airplane-single-p.py),
              [Standard encoding](airplane-single.py), 
              [dReach script](airplane-single.drh)
    * Sat:    [New encoding](airplane-single-p-sat.py),
              [Standard encoding](airplane-single-sat.py), 
              [dReach script](airplane-single-sat.drh)
* Multirate model
    * Unsat:  [New encoding](airplane-multi-p.py),
              [Standard encoding](airplane-multi.py), 
              dReach scripts([k=4n](airplane-multi.drh), [k=4n+2](airplane-multi-1.drh))
    * Sat:    [New encoding](airplane-multi-p-sat.py),
              [Standard encoding](airplane-multi-sat.py), 
              dReach scripts([k=4n](airplane-multi-sat.drh), [k=4n+2](airplane-multi-1-sat.drh))


