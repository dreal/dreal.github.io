---
layout: archive
permalink: /
title: ""
---

<div class="tiles">
{% for post in site.posts %}
        {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

**dReal** is an automated reasoning tool. It focuses on solving problems that can be encoded as first-order logic formulas over the real numbers. Its special strength is in handling problems that involve a wide range of nonlinear real functions. **dReal** implements the framework of \\(\delta\\)-complete decision procedures (see [[GAC'12]]).

[GAC'12]: https://scungao.github.io/papers/delta_complete_decision_procedures.pdf

**dReal** returns "unsat" or
"\\(\delta\\)-sat" on input formulas, where \\(\delta\\) is a numerical error bound specified by the user. When the answer is "unsat", **dReal** guarantees that the formula is unsatisfiable. When the answer is "\\(\delta\\)-sat", it returns a set of solutions that all satisfy a \\(\delta\\)-perturbed form of the input formula. 

We have benefited greatly from various tools, including [ibex][ibex], [picosat][picosat], and [capd][capd].

[ibex]: http://www.ibex-lib.org/
[picosat]: http://fmv.jku.at/picosat/
[capd]: http://capd.ii.uj.edu.pl/

## Example

Let's consider the following example which slighly modifies a formula
from the [Flyspeck][flyspeck] project benchmarks:

\\[
\exists^{[3.0,3.14]}x_1. \exists^{[-7.0,5.0]}x_2. 2 \times 3.14159265 - 2 x_1 \arcsin \left(\cos 0.797\times \sin \left(\frac{3.14159265}{x_1}\right)\right) \le - 0.591 - 0.0331 x_2 + 0.506 + 1.0
\\]


### Solving with dReal

To solve the formula using **dReal**, we first translate it into the
following SMT2 formula ([172.smt2][172.smt2]):

{% highlight text linenos %}
(set-logic QF_NRA)
(declare-fun x1 () Real)
(declare-fun x2 () Real)
(assert (<= 3.0 x1))
(assert (<= x1 3.14))
(assert (<= -7.0 x2))
(assert (<= x2 5.0))
(assert (<= (- (* 2.0 3.14159265) (* 2.0 (* x1 (arcsin (* (cos 0.797) (sin (/ 3.14159265 x1)))))))
            (+ (- (- 0.591) (* 0.0331 x2)) (+ 0.506 1.0))))
(check-sat)
(exit)
{% endhighlight %}

Note that we encode the range of \\(x_1\\) and \\(x_2\\) using four
``assert`` commands ``(assert (<= 3.0 x1)``, ``(assert (<= x1
64.0))``, ``(assert (<= -7.0 x2))``, and ``(assert (<= x2 5.0))``.

We check the \\(\delta\\)-satisfiability of the formula using
**dReal**:

{% highlight bash %}
$ dReal 172.smt2
unsat
{% endhighlight %}

It takes less than a second to terminate with the **unsat** result.
Recall that this **unsat** result is **exact** and does not involve
any numerical approximation. In the above example, we did not provide
the value of \\(\delta\\) and therefore **dReal** used the default
value -- 0.001. We do have a command-line argument to specify the
delta ``--precision``.

To see the detailed decision traces along with the solving process,
use ``--verbose`` option (the omitted result is in
[172.smt.verbose][172.smt2.verbose]):


{% highlight bash %}
$ dReal --verbose 172.smt2
...
unsat
{% endhighlight %}

### Proof Checking

**dReal** is also able to generate a proof along with the
\\(\delta\\)-satisfiability result. Using ``--proof`` option generates
the proof [172.smt2.proof][172.smt2.proof].

{% highlight bash %}
$ dReal --proof 172.smt
unsat
{% endhighlight %}

We also provide a *proof checker* which can validate the proof for the
*unsat* cases. Our proof-checking process is a semi-algorithm and
therefore its termination is not guaranteed. ``-t`` option shoud be
used to specify the timeout in seconds.

{% highlight bash %}
$ proofcheck.sh -t 30 172.smt2.proof
...
proof verified
{% endhighlight %}

[172.smt2.proof.output] shows that our proof checker solved 4
 subproblems in the process of checking and was able to verify the
 proof within 3 seconds. It saves all the extra information under the
 directory [172.smt2.proof.extra][172.smt2.proof.extra].

[flyspeck]: http://code.google.com/p/flyspeck/
[172.smt2]: archives/172.smt2
[172.smt2.verbose]: archives/172.smt2.verbose
[172.smt2.proof]: archives/172.smt2.proof
[172.smt2.proof.extra]: ./archives/172.smt2.proof.extra.tar.gz
[172.smt2.proof.output]: ./archives/172.smt2.proof.output
