---
layout: archive
title: "Atrial Fibrillation Model"
date:
modified:
excerpt:
image:
  feature:
  teaser:
  thumb:
ads: false
---

We studied the Atrial Fibrillation model as developed in [Grosu et al][cav11]. The
model has four discrete control locations, four state variables, and
nonlinear ODEs.

- - - - -

## Benchmarks
<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="left" />

<col  class="right" />

<col  class="right" />

<col  class="right" />

<col  class="right" />

<col  class="right" />

<col  class="left" />

<col  class="right" />

<col  class="left" />
</colgroup>
<thead>
<tr>
<th scope="col" class="left">Benchmark</th>
<th scope="col" class="right">#Mode</th>
<th scope="col" class="right">#Depth</th>
<th scope="col" class="right">#ODEs</th>
<th scope="col" class="right">#Vars</th>
<th scope="col" class="right">Precision(&delta;)</th>
<th scope="col" class="left">Result</th>
<th scope="col" class="right">Time(sec)</th>
<th scope="col" class="left">Trace Size</th>
</tr>
</thead>
<tbody>
<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/bing_example/cardiac/cardiac_good.drh">AF-GOOD</a></td>
<td class="right">4</td>
<td class="right">3</td>
<td class="right">20</td>
<td class="right">53</td>
<td class="right">0.001</td>
<td class="left">SAT</td>
<td class="right">0.425</td>
<td class="left"><a href="/#!benchmarks/show_vis.md?config=atrial_fibrillation/data_good.js">793K</a></td>
</tr>

<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/bing_example/cardiac/cardiac_bad.drh">AF-BAD</a></td>
<td class="right">4</td>
<td class="right">3</td>
<td class="right">20</td>
<td class="right">53</td>
<td class="right">0.001</td>
<td class="left">UNSAT</td>
<td class="right">0.074</td>
<td class="left">--</td>
</tr>

<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/bing_example/cardiac/cardiac_to1_good.drh">AF-TO1-GOOD</a></td>
<td class="right">4</td>
<td class="right">3</td>
<td class="right">20</td>
<td class="right">62</td>
<td class="right">0.001</td>
<td class="left">SAT</td>
<td class="right">2.750</td>
<td class="left"><a href="/#!benchmarks/show_vis.md?config=atrial_fibrillation/data_to1_good.js">224K</a></td>
</tr>

<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/bing_example/cardiac/cardiac_to1_bad.drh">AF-TO1-BAD</a></td>
<td class="right">4</td>
<td class="right">3</td>
<td class="right">20</td>
<td class="right">62</td>
<td class="right">0.005</td>
<td class="left">UNSAT</td>
<td class="right">5.189</td>
<td class="left">--</td>
</tr>

<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/bing_example/cardiac/cardiac_to2_good.drh">AF-TO2-GOOD</a></td>
<td class="right">4</td>
<td class="right">3</td>
<td class="right">20</td>
<td class="right">62</td>
<td class="right">0.001</td>
<td class="left">SAT</td>
<td class="right">3.876</td>
<td class="left"><a href="/#!benchmarks/show_vis.md?config=atrial_fibrillation/data_to2_good.js">553K</a></td>
</tr>

<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/bing_example/cardiac/cardiac_to2_bad.drh">AF-TO2-BAD</a></td>
<td class="right">4</td>
<td class="right">3</td>
<td class="right">20</td>
<td class="right">62</td>
<td class="right">0.001</td>
<td class="left">UNSAT</td>
<td class="right">8.857</td>
<td class="left">--</td>
</tr>

<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/bing_example/cardiac/cardiac_tso1_tso2.drh">AF-TSO1-TSO2</a></td>
<td class="right">4</td>
<td class="right">3</td>
<td class="right">20</td>
<td class="right">62</td>
<td class="right">0.001</td>
<td class="left">UNSAT</td>
<td class="right">0.027</td>
<td class="left">--</td>
</tr>

<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/hybrid_systems/cardiac/new_cardiac_stim.drh">AF8-K7</a></td>
<td class="right">8</td>
<td class="right">7</td>
<td class="right">40</td>
<td class="right">101</td>
<td class="right">0.001</td>
<td class="left">SAT</td>
<td class="right">10.478</td>
<td class="left"><a href="/#!benchmarks/show_vis.md?config=atrial_fibrillation/data_k7.js">3.8M</a></td>
</tr>

<tr>
<td class="left"><a href="https://raw.github.com/soonhokong/dReal-soonhok/master/benchmarks/hybrid_systems/cardiac/new_cardiac_stim.drh">AF8-K23</a></td>
<td class="right">8</td>
<td class="right">23</td>
<td class="right">40</td>
<td class="right">293</td>
<td class="right">0.005</td>
<td class="left">SAT</td>
<td class="right">135.29</td>
<td class="left"><a href="/#!benchmarks/show_vis.md?config=atrial_fibrillation/data_k23.js">11M</a></td>
</tr>
</tbody>
</table>

## Dynamics

!["Minimal Resistor Model"](/benchmarks/atrial_fibrillation/fig-cardiac.svg "Minimal Resistor Model")

A typical set of ODEs in the model is:

\begin{aligned}
\frac{du}{dt} & = e + (u-\theta\_v)(u\_u-u ) v g\_{fi} + wsg\_{si}-g\_{so}(u) \\\\ \
\frac{ds}{dt} & = \displaystyle\frac{g\_{s2}}{(1+\exp(-2k(u-us)))} -  g\_{s2}s \\\\ \
\frac{dv}{dt} & = -g\_v^+\cdot v \\\\ \
\frac{dw}{dt} & = -g\_w^+\cdot w 
\end{aligned}

The exponential term on the right-hand side of the ODE is the sigmoid
function, which often appears in modelling biological switches.

- - - - -

## Hybrid System Model

```drh
//Translated to drh by Sicun Gao on Apr-18-2013
// ===============================================================
// ==   Minimal Resistor Model (4 state variables)              ==
// ==                                                           ==
// ==   Author:  E. Bartocci                                    ==
// ==                                                           ==
// ==   Date:  11/05/10                                         ==
// ==                                                           ==
// ==   Free distribution with authors permission               ==
// ==                                                           ==
// ==   SUNY Stony Brook, Stony Brook, NY                       ==
// ==                                                           ==
// ===============================================================
// The following are the parameters that you can find in the paper
// A. Bueno-Orovio, M. Cherry, and F. Fenton, ?Minimal model for
// human ventricular action potentials in tissue,? Journal of
// Theoretical Biology, no. 253, pp. 544?560, 2008.
// ===============================================================

#define    EPI_TVP      1.4506
#define    EPI_TV1M       60.0
#define    EPI_TV2M     1150.0

#define    EPI_TWP       200.0

#define    EPI_TW1M       60.0
#define    EPI_TW2M       15.0

#define    EPI_TS1        2.7342
#define    EPI_TS2       16.0     //The same with Flavio's paper
#define    EPI_TFI        0.11    //The same with Flavio's paper
//#define    EPI_TO1      0.0055    //The same with Flavio's paper
#define    EPI_TO2       6      //The same with Flavio's paper
#define    EPI_TSO1      30.0181 //The same with Flavio's paper
#define    EPI_TSO2       0.9957  //The same with Flavio's paper

#define    EPI_TSI        1.8875  // We have TSI1 and TSI2   TSI in Flavio's paper


#define    EPI_TWINF     0.07    //The same with Flavio's paper
#define    EPI_THV       0.3     //EPUM The same of Flavio's paper
#define    EPI_THVM      0.006   //EPUQ The same of Flavio's paper
#define    EPI_THVINF    0.006   //EPUQ The same of Flavio's paper
#define    EPI_THW       0.13    //EPUP The same of Flavio's paper
#define    EPI_THWINF    0.006    //EPURR In Flavio's paper 0.13
#define    EPI_THSO      0.13    //EPUP The same of Flavio's paper
#define    EPI_THSI      0.13    //EPUP The same of Flavio's paper
#define    EPI_THO       0.006    //EPURR The same of Flavio's paper

#define    EPI_KWM       65.0     //The same of Flavio's paper
#define    EPI_KS        2.0994  //The same of Flavio's paper
#define    EPI_KSO       2.0458  //The same of Flavio's paper

#define    EPI_UWM       0.03    //The same of Flavio's paper
#define    EPI_US        0.9087  //The same of Flavio's paper
#define    EPI_UO        0.0     // The same of Flavio's paper
#define    EPI_UU        1.55   // The same of Flavio's paper
#define    EPI_USO       0.65   // The same of Flavio's paper

#define    jfi1 0.0
#define    jso1  (u/EPI_TO1)
#define    jsi1  0.0

#define    jfi2  0.0
#define    jso2  (u/EPI_TO2)
#define    jsi2 0.0


#define    jfi3 0.0
#define    jso3 1.0/(EPI_TSO1+((EPI_TSO2- EPI_TSO1)*(1/(1+exp(-2*EPI_KSO*(u- EPI_USO))))))
#define    jsi3 (0 - (w * s)/EPI_TSI)

#define    jfi4  (0 - v * (u - EPI_THV) * (EPI_UU - u)/EPI_TFI)
#define    jso4  (1.0 / (EPI_TSO1+((EPI_TSO2 - EPI_TSO1)*(1/(1+exp(-2*EPI_KSO*(u- EPI_USO)))))))
#define    jsi4  ( 0 - (w * s)/EPI_TSI)
#define    stim  1.0 // The external stimulation is a rectangular pulse of height 1 and length 1ms. Since u reach its max during the stimulation, time scale is set to be [0,1]

[0, 2.0] u;
[0, 2.0] v;
[0, 2.0] w;
[0, 2.0] s;

[0.0061, 0.007] EPI_TO1;

[0, 1] tau;
[0, 1] time;

{mode 1;

invt:           (u >= 0);
        (u <= 0.006);
        (v >= 0);
                (w >= 0);
                (s >= 0);
                (tau >= 0);
        (EPI_TO1 >= 0.0061);
        (EPI_TO1 <= 0.007);

flow:
              d/dt[EPI_TO1] = 0.0;
              d/dt[tau] = 1.0;
              d/dt[u] = (stim - jfi1) - (jso1 + jsi1);
              d/dt[w] = ((1.0 -(u/EPI_TWINF) - w)/(EPI_TW1M + (EPI_TW2M - EPI_TW1M) * (1/(1+exp(-2*EPI_KWM*(u - EPI_UWM))))));
              d/dt[v] = ((1.0 - v)/EPI_TV1M);
              d/dt[s] = (((1/(1+exp( -2 * EPI_KS * (u - EPI_US) ))) - s)/EPI_TS1);
jump:
              (u >= 0.006) ==> @2 (and (tau' = tau) (u' = u) (v'= v) (w' = w) (s' = s) (EPI_TO1' =  EPI_TO1));
}

{mode 2;

invt:
                (u >= 0.006);
                (u <= 0.013);
                        (v >= 0);
                (w >= 0);
                (s >= 0);
                (tau >= 0);
        (EPI_TO1 >= 0.0061);
        (EPI_TO1 <= 0.007);

flow:
              d/dt[EPI_TO1] = 0.0;
              d/dt[tau] = 1.0;
              d/dt[u] = (stim - jfi2) - (jso2 + jsi2);
              d/dt[w] = ((0.94-w)/(EPI_TW1M + (EPI_TW2M - EPI_TW1M) * (1/(1+exp(-2*EPI_KWM*(u - EPI_UWM))))));
              d/dt[v] = (-v/EPI_TV2M);
              d/dt[s] = (((1/(1+exp( -2 * EPI_KS * (u - EPI_US) ))) - s)/EPI_TS1);
jump:
                ( u >= 0.013) ==> @3 (and (tau' = tau) (u' = u) (v'= v) (w' = w) (s' = s) (EPI_TO1' =  EPI_TO1));

}

{mode 3;

invt:
                (u >= 0.013);
                (u <= 0.3);
                (v >= 0);
                (w >= 0);
                (s >= 0);
                (tau >= 0);
        (EPI_TO1 >= 0.0061);
        (EPI_TO1 <= 0.007);

flow:
              d/dt[EPI_TO1] = 0.0;
              d/dt[tau] = 1.0;
              d/dt[u] = (stim - jfi3) - (jso3 + jsi3);
              d/dt[w] = (-w/EPI_TWP);
              d/dt[v] = (-v/EPI_TV2M);
              d/dt[s] = (((1/(1+exp( -2 * EPI_KS * (u - EPI_US) ))) - s)/EPI_TS2);
jump:
                ( u >= 0.3) ==> @4 (and (tau' = tau) (u' = u) (v'= v) (w' = w) (s' = s) (EPI_TO1' =  EPI_TO1));
}

{mode 4;

invt:
                (u >= 0.3);
                (v >= 0);
                (w >= 0);
                (s >= 0);
                (tau >= 0);
        (EPI_TO1 >= 0.0061);
        (EPI_TO1 <= 0.007);

flow:
              d/dt[EPI_TO1] = 0.0;
              d/dt[tau] = 1.0;
              d/dt[u] =  (stim - jfi4) - (jso4 + jsi4);
              d/dt[w]  = (-w/EPI_TWP);
              d/dt[v]  = (-v/EPI_TVP);
              d/dt[s]  = (((1/(1+exp( -2 * EPI_KS * (u - EPI_US) ))) - s)/EPI_TS2) ;
jump:
                ( u > 2.0) ==> @4 (and (tau' = tau) (u' = u) (v'= v) (w' = w) (s' = s) (EPI_TO1' =  EPI_TO1));
}

init:	@1 (and (tau = 0) (u = 0.0) (v = 1.0) (w = 1.0) (s = 0.0) (EPI_TO1 >= 0.0061) (EPI_TO1 <= 0.007));

goal:   @4 (and (tau > 0) (tau <= 2) (u >= 0.3) (u <= 2) (v >= 0) (v <= 2) (w >= 0) (w <= 2) (s >= 0) (s <= 2) (EPI_TO1 >= 0.0061) (EPI_TO1 <= 0.007) );
```

- - - - -

## Logic Encoding

```smt2
(set-logic QF_NRA_ODE)
(declare-fun w () Real)
(declare-fun v () Real)
(declare-fun u () Real)
(declare-fun tau () Real)
(declare-fun s () Real)
(declare-fun EPI_TO1 () Real)
(declare-fun w_0_0 () Real)
(declare-fun w_0_t () Real)
(declare-fun w_1_0 () Real)
(declare-fun w_1_t () Real)
(declare-fun w_2_0 () Real)
(declare-fun w_2_t () Real)
(declare-fun w_3_0 () Real)
(declare-fun w_3_t () Real)
(declare-fun v_0_0 () Real)
(declare-fun v_0_t () Real)
(declare-fun v_1_0 () Real)
(declare-fun v_1_t () Real)
(declare-fun v_2_0 () Real)
(declare-fun v_2_t () Real)
(declare-fun v_3_0 () Real)
(declare-fun v_3_t () Real)
(declare-fun u_0_0 () Real)
(declare-fun u_0_t () Real)
(declare-fun u_1_0 () Real)
(declare-fun u_1_t () Real)
(declare-fun u_2_0 () Real)
(declare-fun u_2_t () Real)
(declare-fun u_3_0 () Real)
(declare-fun u_3_t () Real)
(declare-fun tau_0_0 () Real)
(declare-fun tau_0_t () Real)
(declare-fun tau_1_0 () Real)
(declare-fun tau_1_t () Real)
(declare-fun tau_2_0 () Real)
(declare-fun tau_2_t () Real)
(declare-fun tau_3_0 () Real)
(declare-fun tau_3_t () Real)
(declare-fun s_0_0 () Real)
(declare-fun s_0_t () Real)
(declare-fun s_1_0 () Real)
(declare-fun s_1_t () Real)
(declare-fun s_2_0 () Real)
(declare-fun s_2_t () Real)
(declare-fun s_3_0 () Real)
(declare-fun s_3_t () Real)
(declare-fun EPI_TO1_0_0 () Real)
(declare-fun EPI_TO1_0_t () Real)
(declare-fun EPI_TO1_1_0 () Real)
(declare-fun EPI_TO1_1_t () Real)
(declare-fun EPI_TO1_2_0 () Real)
(declare-fun EPI_TO1_2_t () Real)
(declare-fun EPI_TO1_3_0 () Real)
(declare-fun EPI_TO1_3_t () Real)
(declare-fun time_0 () Real)
(declare-fun time_1 () Real)
(declare-fun time_2 () Real)
(declare-fun time_3 () Real)
(declare-fun mode_0 () Real)
(declare-fun mode_1 () Real)
(declare-fun mode_2 () Real)
(declare-fun mode_3 () Real)
(define-ode flow_1 ((= d/dt[EPI_TO1] 0.000000) (= d/dt[tau] 1.000000) (= d/dt[u] (- (- 1.000000 0.000000) (+ (/ u EPI_TO1) 0.000000))) (= d/dt[w] (/ (- (- 1.000000 (/ u 0.070000)) w) (+ 60.000000 (* (- 15.000000 60.000000) (/ 1.000000 (+ 1.000000 (exp (* (* -2.000000 65.000000) (- u 0.030000))))))))) (= d/dt[v] (/ (- 1.000000 v) 60.000000)) (= d/dt[s] (/ (- (/ 1.000000 (+ 1.000000 (exp (* (* -2.000000 2.099400) (- u 0.908700))))) s) 2.734200))))
(define-ode flow_2 ((= d/dt[EPI_TO1] 0.000000) (= d/dt[tau] 1.000000) (= d/dt[u] (- (- 1.000000 0.000000) (+ (/ u 6.000000) 0.000000))) (= d/dt[w] (/ (- 0.940000 w) (+ 60.000000 (* (- 15.000000 60.000000) (/ 1.000000 (+ 1.000000 (exp (* (* -2.000000 65.000000) (- u 0.030000))))))))) (= d/dt[v] (/ (- 0.000000 v) 1150.000000)) (= d/dt[s] (/ (- (/ 1.000000 (+ 1.000000 (exp (* (* -2.000000 2.099400) (- u 0.908700))))) s) 2.734200))))
(define-ode flow_3 ((= d/dt[EPI_TO1] 0.000000) (= d/dt[tau] 1.000000) (= d/dt[u] (- (- 1.000000 0.000000) (+ (/ 1.000000 (+ 30.018100 (* (- 0.995700 30.018100) (/ 1.000000 (+ 1.000000 (exp (* (* -2.000000 2.045800) (- u 0.650000)))))))) (- 0.000000 (/ (* w s) 1.887500))))) (= d/dt[w] (/ (- 0.000000 w) 200.000000)) (= d/dt[v] (/ (- 0.000000 v) 1150.000000)) (= d/dt[s] (/ (- (/ 1.000000 (+ 1.000000 (exp (* (* -2.000000 2.099400) (- u 0.908700))))) s) 16.000000))))
(define-ode flow_4 ((= d/dt[EPI_TO1] 0.000000) (= d/dt[tau] 1.000000) (= d/dt[u] (- (- 1.000000 (- 0.000000 (/ (* (* v (- u 0.300000)) (- 1.550000 u)) 0.110000))) (+ (/ 1.000000 (+ 30.018100 (* (- 0.995700 30.018100) (/ 1.000000 (+ 1.000000 (exp (* (* -2.000000 2.045800) (- u 0.650000)))))))) (- 0.000000 (/ (* w s) 1.887500))))) (= d/dt[w] (/ (- 0.000000 w) 200.000000)) (= d/dt[v] (/ (- 0.000000 v) 1.450600)) (= d/dt[s] (/ (- (/ 1.000000 (+ 1.000000 (exp (* (* -2.000000 2.099400) (- u 0.908700))))) s) 16.000000))))
(assert (<= 0.000000 w_0_0))
(assert (<= w_0_0 2.000000))
(assert (<= 0.000000 w_0_t))
(assert (<= w_0_t 2.000000))
(assert (<= 0.000000 w_1_0))
(assert (<= w_1_0 2.000000))
(assert (<= 0.000000 w_1_t))
(assert (<= w_1_t 2.000000))
(assert (<= 0.000000 w_2_0))
(assert (<= w_2_0 2.000000))
(assert (<= 0.000000 w_2_t))
(assert (<= w_2_t 2.000000))
(assert (<= 0.000000 w_3_0))
(assert (<= w_3_0 2.000000))
(assert (<= 0.000000 w_3_t))
(assert (<= w_3_t 2.000000))
(assert (<= 0.000000 v_0_0))
(assert (<= v_0_0 2.000000))
(assert (<= 0.000000 v_0_t))
(assert (<= v_0_t 2.000000))
(assert (<= 0.000000 v_1_0))
(assert (<= v_1_0 2.000000))
(assert (<= 0.000000 v_1_t))
(assert (<= v_1_t 2.000000))
(assert (<= 0.000000 v_2_0))
(assert (<= v_2_0 2.000000))
(assert (<= 0.000000 v_2_t))
(assert (<= v_2_t 2.000000))
(assert (<= 0.000000 v_3_0))
(assert (<= v_3_0 2.000000))
(assert (<= 0.000000 v_3_t))
(assert (<= v_3_t 2.000000))
(assert (<= 0.000000 u_0_0))
(assert (<= u_0_0 2.000000))
(assert (<= 0.000000 u_0_t))
(assert (<= u_0_t 2.000000))
(assert (<= 0.000000 u_1_0))
(assert (<= u_1_0 2.000000))
(assert (<= 0.000000 u_1_t))
(assert (<= u_1_t 2.000000))
(assert (<= 0.000000 u_2_0))
(assert (<= u_2_0 2.000000))
(assert (<= 0.000000 u_2_t))
(assert (<= u_2_t 2.000000))
(assert (<= 0.000000 u_3_0))
(assert (<= u_3_0 2.000000))
(assert (<= 0.000000 u_3_t))
(assert (<= u_3_t 2.000000))
(assert (<= 0.000000 tau_0_0))
(assert (<= tau_0_0 1.000000))
(assert (<= 0.000000 tau_0_t))
(assert (<= tau_0_t 1.000000))
(assert (<= 0.000000 tau_1_0))
(assert (<= tau_1_0 1.000000))
(assert (<= 0.000000 tau_1_t))
(assert (<= tau_1_t 1.000000))
(assert (<= 0.000000 tau_2_0))
(assert (<= tau_2_0 1.000000))
(assert (<= 0.000000 tau_2_t))
(assert (<= tau_2_t 1.000000))
(assert (<= 0.000000 tau_3_0))
(assert (<= tau_3_0 1.000000))
(assert (<= 0.000000 tau_3_t))
(assert (<= tau_3_t 1.000000))
(assert (<= 0.000000 s_0_0))
(assert (<= s_0_0 2.000000))
(assert (<= 0.000000 s_0_t))
(assert (<= s_0_t 2.000000))
(assert (<= 0.000000 s_1_0))
(assert (<= s_1_0 2.000000))
(assert (<= 0.000000 s_1_t))
(assert (<= s_1_t 2.000000))
(assert (<= 0.000000 s_2_0))
(assert (<= s_2_0 2.000000))
(assert (<= 0.000000 s_2_t))
(assert (<= s_2_t 2.000000))
(assert (<= 0.000000 s_3_0))
(assert (<= s_3_0 2.000000))
(assert (<= 0.000000 s_3_t))
(assert (<= s_3_t 2.000000))
(assert (<= 0.006100 EPI_TO1_0_0))
(assert (<= EPI_TO1_0_0 0.007000))
(assert (<= 0.006100 EPI_TO1_0_t))
(assert (<= EPI_TO1_0_t 0.007000))
(assert (<= 0.006100 EPI_TO1_1_0))
(assert (<= EPI_TO1_1_0 0.007000))
(assert (<= 0.006100 EPI_TO1_1_t))
(assert (<= EPI_TO1_1_t 0.007000))
(assert (<= 0.006100 EPI_TO1_2_0))
(assert (<= EPI_TO1_2_0 0.007000))
(assert (<= 0.006100 EPI_TO1_2_t))
(assert (<= EPI_TO1_2_t 0.007000))
(assert (<= 0.006100 EPI_TO1_3_0))
(assert (<= EPI_TO1_3_0 0.007000))
(assert (<= 0.006100 EPI_TO1_3_t))
(assert (<= EPI_TO1_3_t 0.007000))
(assert (<= 0.000000 time_0))
(assert (<= time_0 1.000000))
(assert (<= 0.000000 time_1))
(assert (<= time_1 1.000000))
(assert (<= 0.000000 time_2))
(assert (<= time_2 1.000000))
(assert (<= 0.000000 time_3))
(assert (<= time_3 1.000000))
(assert (<= 1.000000 mode_0))
(assert (<= mode_0 4.000000))
(assert (<= 1.000000 mode_1))
(assert (<= mode_1 4.000000))
(assert (<= 1.000000 mode_2))
(assert (<= mode_2 4.000000))
(assert (<= 1.000000 mode_3))
(assert (<= mode_3 4.000000))
(assert (and (and (<= EPI_TO1_0_0 0.007000) (>= EPI_TO1_0_0 0.006100) (= s_0_0 0.000000) (= w_0_0 1.000000) (= v_0_0 1.000000) (= u_0_0 0.000000) (= tau_0_0 0.000000)) (= mode_0 1.000000) (= [w_0_t v_0_t u_0_t tau_0_t s_0_t EPI_TO1_0_t] (integral 0. time_0 [w_0_0 v_0_0 u_0_0 tau_0_0 s_0_0 EPI_TO1_0_0] flow_1)) (= mode_0 1.000000) (forall_t 1.000000 [0.000000 time_0] (>= u_0_t 0.000000)) (>= u_0_t 0.000000) (>= u_0_0 0.000000) (forall_t 1.000000 [0.000000 time_0] (<= u_0_t 0.006000)) (<= u_0_t 0.006000) (<= u_0_0 0.006000) (forall_t 1.000000 [0.000000 time_0] (>= v_0_t 0.000000)) (>= v_0_t 0.000000) (>= v_0_0 0.000000) (forall_t 1.000000 [0.000000 time_0] (>= w_0_t 0.000000)) (>= w_0_t 0.000000) (>= w_0_0 0.000000) (forall_t 1.000000 [0.000000 time_0] (>= s_0_t 0.000000)) (>= s_0_t 0.000000) (>= s_0_0 0.000000) (forall_t 1.000000 [0.000000 time_0] (>= tau_0_t 0.000000)) (>= tau_0_t 0.000000) (>= tau_0_0 0.000000) (forall_t 1.000000 [0.000000 time_0] (>= EPI_TO1_0_t 0.006100)) (>= EPI_TO1_0_t 0.006100) (>= EPI_TO1_0_0 0.006100) (forall_t 1.000000 [0.000000 time_0] (<= EPI_TO1_0_t 0.007000)) (<= EPI_TO1_0_t 0.007000) (<= EPI_TO1_0_0 0.007000) (= mode_1 2.000000) (>= u_0_t 0.006000) (= EPI_TO1_1_0 EPI_TO1_0_t) (= s_1_0 s_0_t) (= w_1_0 w_0_t) (= v_1_0 v_0_t) (= u_1_0 u_0_t) (= tau_1_0 tau_0_t) (= [w_1_t v_1_t u_1_t tau_1_t s_1_t EPI_TO1_1_t] (integral 0. time_1 [w_1_0 v_1_0 u_1_0 tau_1_0 s_1_0 EPI_TO1_1_0] flow_2)) (= mode_1 2.000000) (forall_t 2.000000 [0.000000 time_1] (>= u_1_t 0.006000)) (>= u_1_t 0.006000) (>= u_1_0 0.006000) (forall_t 2.000000 [0.000000 time_1] (<= u_1_t 0.013000)) (<= u_1_t 0.013000) (<= u_1_0 0.013000) (forall_t 2.000000 [0.000000 time_1] (>= v_1_t 0.000000)) (>= v_1_t 0.000000) (>= v_1_0 0.000000) (forall_t 2.000000 [0.000000 time_1] (>= w_1_t 0.000000)) (>= w_1_t 0.000000) (>= w_1_0 0.000000) (forall_t 2.000000 [0.000000 time_1] (>= s_1_t 0.000000)) (>= s_1_t 0.000000) (>= s_1_0 0.000000) (forall_t 2.000000 [0.000000 time_1] (>= tau_1_t 0.000000)) (>= tau_1_t 0.000000) (>= tau_1_0 0.000000) (forall_t 2.000000 [0.000000 time_1] (>= EPI_TO1_1_t 0.006100)) (>= EPI_TO1_1_t 0.006100) (>= EPI_TO1_1_0 0.006100) (forall_t 2.000000 [0.000000 time_1] (<= EPI_TO1_1_t 0.007000)) (<= EPI_TO1_1_t 0.007000) (<= EPI_TO1_1_0 0.007000) (= mode_2 3.000000) (>= u_1_t 0.013000) (= EPI_TO1_2_0 EPI_TO1_1_t) (= s_2_0 s_1_t) (= w_2_0 w_1_t) (= v_2_0 v_1_t) (= u_2_0 u_1_t) (= tau_2_0 tau_1_t) (= [w_2_t v_2_t u_2_t tau_2_t s_2_t EPI_TO1_2_t] (integral 0. time_2 [w_2_0 v_2_0 u_2_0 tau_2_0 s_2_0 EPI_TO1_2_0] flow_3)) (= mode_2 3.000000) (forall_t 3.000000 [0.000000 time_2] (>= u_2_t 0.013000)) (>= u_2_t 0.013000) (>= u_2_0 0.013000) (forall_t 3.000000 [0.000000 time_2] (<= u_2_t 0.300000)) (<= u_2_t 0.300000) (<= u_2_0 0.300000) (forall_t 3.000000 [0.000000 time_2] (>= v_2_t 0.000000)) (>= v_2_t 0.000000) (>= v_2_0 0.000000) (forall_t 3.000000 [0.000000 time_2] (>= w_2_t 0.000000)) (>= w_2_t 0.000000) (>= w_2_0 0.000000) (forall_t 3.000000 [0.000000 time_2] (>= s_2_t 0.000000)) (>= s_2_t 0.000000) (>= s_2_0 0.000000) (forall_t 3.000000 [0.000000 time_2] (>= tau_2_t 0.000000)) (>= tau_2_t 0.000000) (>= tau_2_0 0.000000) (forall_t 3.000000 [0.000000 time_2] (>= EPI_TO1_2_t 0.006100)) (>= EPI_TO1_2_t 0.006100) (>= EPI_TO1_2_0 0.006100) (forall_t 3.000000 [0.000000 time_2] (<= EPI_TO1_2_t 0.007000)) (<= EPI_TO1_2_t 0.007000) (<= EPI_TO1_2_0 0.007000) (= mode_3 4.000000) (>= u_2_t 0.300000) (= EPI_TO1_3_0 EPI_TO1_2_t) (= s_3_0 s_2_t) (= w_3_0 w_2_t) (= v_3_0 v_2_t) (= u_3_0 u_2_t) (= tau_3_0 tau_2_t) (= [w_3_t v_3_t u_3_t tau_3_t s_3_t EPI_TO1_3_t] (integral 0. time_3 [w_3_0 v_3_0 u_3_0 tau_3_0 s_3_0 EPI_TO1_3_0] flow_4)) (= mode_3 4.000000) (forall_t 4.000000 [0.000000 time_3] (>= u_3_t 0.300000)) (>= u_3_t 0.300000) (>= u_3_0 0.300000) (forall_t 4.000000 [0.000000 time_3] (>= v_3_t 0.000000)) (>= v_3_t 0.000000) (>= v_3_0 0.000000) (forall_t 4.000000 [0.000000 time_3] (>= w_3_t 0.000000)) (>= w_3_t 0.000000) (>= w_3_0 0.000000) (forall_t 4.000000 [0.000000 time_3] (>= s_3_t 0.000000)) (>= s_3_t 0.000000) (>= s_3_0 0.000000) (forall_t 4.000000 [0.000000 time_3] (>= tau_3_t 0.000000)) (>= tau_3_t 0.000000) (>= tau_3_0 0.000000) (forall_t 4.000000 [0.000000 time_3] (>= EPI_TO1_3_t 0.006100)) (>= EPI_TO1_3_t 0.006100) (>= EPI_TO1_3_0 0.006100) (forall_t 4.000000 [0.000000 time_3] (<= EPI_TO1_3_t 0.007000)) (<= EPI_TO1_3_t 0.007000) (<= EPI_TO1_3_0 0.007000) (= mode_3 4.000000) (<= EPI_TO1_3_t 0.007000) (>= EPI_TO1_3_t 0.006100) (<= s_3_t 2.000000) (>= s_3_t 0.000000) (<= w_3_t 2.000000) (>= w_3_t 0.000000) (<= v_3_t 2.000000) (>= v_3_t 0.000000) (<= u_3_t 2.000000) (>= u_3_t 0.300000) (<= tau_3_t 2.000000) (> tau_3_t 0.000000)))
(check-sat)
(exit)
```

- - - - -

## Result

<script src="/js/d3.v3.js"></script>
<script src="/js/underscore-min.js"></script>
<div id="chart-container" style="text-align:center">
<script type="text/javascript" src="/benchmarks/atrial_fibrillation/data.js"></script>
<script type="text/javascript" src="/js/vis.js"></script>
</div>

- - - - -

## Reference

 1. R. Grosu, G. Batt, F. H. Fenton, J. Glimm, C. L. Guernic, S. A. Smolka, and
E. Bartocci. From cardiac cells to genetic regulatory networks. In CAV, pages
396–411, 2011. [[pdf][cav11]]

[cav11]: http://www.cs.sunysb.edu/~grosu/cav11.pdf‎
