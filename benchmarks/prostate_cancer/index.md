# Prostate Cancer Model


The Prostate Cancer Treatment model exhibits more nonlinear ODEs.

## Dynamics

<div class="center_img">
    !["Minimal Resistor Model"](/benchmarks/prostate_cancer/fig-prostate.svg "Prostate Cancer Model")
</div>

The reachability questions are

\begin{aligned}
\frac{dx}{dt} =& (\alpha\_x(k\_1+(1-k\_1)\frac{z}{z+k\_2}-\beta\_x( (1-k\_3)\frac{z}{z+k\_4}+k\_3)) - m\_1(1-\frac{z}{z\_0}))x + c\_1 x\\\\
\frac{dy}{dt} =& m\_1(1-\frac{z}{z\_0})x+(\alpha\_y (1- d\frac{z}{z\_0}) - \beta\_y)y+c\_2y\\\\
\frac{dz}{dt} =& \frac{-z}{\tau} + c\_3z\\\\
\frac{dv}{dt} =& (\alpha\_x (k\_1+(1-k\_1)\frac{z}{z+k\_2}-\beta\_x(k\_3+(1-k\_3)\frac{z}{z+k\_4}))\\\\
               & - m\_1(1-\frac{z}{z\_0}))x + c\_1 x + m\_1(1-\frac{z}{z\_0})x+(\alpha\_y (1- d\frac{z}{z\_0}) - \beta\_y)y+c\_2y
\end{aligned}

- - - - -

## Hybrid System Model

```drh

```

- - - - -

## Logic Encoding

```smt2

```

## Result

<script src="/js/d3.v3.js"></script>
<script src="/js/underscore-min.js"></script>
<div id="chart-container" style="text-align:center">
<script type="text/javascript" src="/benchmarks/prostate_cancer/data.js"></script>
<script type="text/javascript" src="/js/vis.js"></script>
</div>

- - - - -

## Reference

 1. Bing Liu, Soonho Kong, Sicun Gao, and Edmund Clarke. Parameter
 Identification Using Delta-Decisions for Biological Hybrid Systems,
 CMU SCS Technical Report, CMU-CS-13-136, 2014.
