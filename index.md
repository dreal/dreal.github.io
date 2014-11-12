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

---

**dReal** is an SMT solver for first-order logic formulas over the reals. It can handle formulas with a wide range of nonlinear real functions in the framework of
\\(\delta\\)-complete decision procedures. 

SMT formulas over the real numbers can encode a wide range of problems
in theorem proving and formal verification. Such formulas are very
hard to solve when nonlinear functions are involved.
\\(\delta\\)-Complete decision procedures provided a new general
framework for handling nonlinear SMT problems over the reals. We say a
decision procedure is \\(\delta\\)-complete for a set \\(S\\) of SMT
formulas, where \\(\delta\\) is an arbitrary positive rational number,
if for any \\(\varphi\\) from \\(S\\) the procedure returns one of the
following answers:

 - "unsat": \\(\varphi\\) is unsatisfiable.
 - "\\(\delta\\)-sat": \\(\varphi^{\delta}\\) is satisfiable.

Here, \\(\varphi^{\delta}\\) is a syntactic variant of \\(\varphi\\)
that encodes a notion of numerical perturbation on logic formulas.
Essentially, we allow such a procedure to give answers with one-sided,
\\(\delta\\)-bounded errors. With this relaxation,
\\(\delta\\)-complete decision procedures can fully exploit the power
of scalable numerical algorithms to solve nonlinear problems, and at
the same time provide suitable correctness guarantees for many
correctness-critical problems. (See references below.)

**dReal** returns "unsat" or
"\\(\delta\\)-sat" on input formulas, where \\(\delta\\) can be
specified by the user. When the answer is "unsat", **dReal** produces
a proof of unsatisfiability; when "\\(\delta\\)-sat", it provides a
solution such that a \\(\delta\\)-perturbed form of the input formula
is satisfied. The tool is based on Interval Constraint Propagation in
the DPLL(T) framework to handle nonlinearity, and is designed to be
easily extendable with other numerical algorithms.

**dReal** has benefited much from the following tools: [realpaver][realpaver],
[opensmt][opensmt], [minisat][minisat], and [capd][capd].

[realpaver]: http://pagesperso.lina.univ-nantes.fr/~granvilliers-l/realpaver/
[opensmt]: http://code.google.com/p/opensmt/
[minisat]: http://minisat.se/
[capd]: http://capd.ii.uj.edu.pl/

## Example

Let's consider the following example which slighly modifies a formula
from the [Flyspeck][flyspeck] project benchmarks:

\\[
\exists^{[3.0,3.14]}x_1. \exists^{[-7.0,5.0]}x_2.
2 \times 3.14159265 - 2 x_1
\arcsin \left(\cos 0.797\times \sin \left(\frac{3.14159265}{x_1}\right)\right) \le
- 0.591 - 0.0331 x_2 + 0.506 + 1.0
\\]


### Solving with dReal

To solve the formula using **dReal**, we first translate it into the
following SMT2 formula ([172.smt2][172.smt2]):

```smt2
(set-logic QF_NRA)
(declare-fun x1 () Real)
(declare-fun x2 () Real)
(assert (<= 3.0 x1))
(assert (<= x1 3.14))
(assert (<= -7.0 x2))
(assert (<= x2 5.0))
(assert (<= (- (* 2.0 3.14159265) (* 2.0 (* x1 (arcsin (* (cos 0.797) (sin (/ 3.14159265 x1)))))))
            (+ (- 0.591 (* 0.0331 x2)) (+ 0.506 1.0))))
(check-sat)
(exit)
```

Note that we encode the range of \\(x_1\\) and \\(x_2\\) using four
``assert`` commands ``(assert (<= 3.0 x1)``, ``(assert (<= x1
64.0))``, ``(assert (<= -7.0 x2))``, and ``(assert (<= x2 5.0))``.

We check the \\(\delta\\)-satisfiability of the formula using
**dReal**:

```
$ dReal 172.smt2
unsat
```

It takes less than a second to terminate with the **unsat** result.
Recall that this **unsat** result is **exact** and does not involve
any numerical approximation. In the above example, we did not provide
the value of \\(\delta\\) and therefore **dReal** used the default
value -- 0.001. We do have a command-line argument to specify the
delta ``--precision``.

To see the detailed decision traces along with the solving process,
use ``--verbose`` option (the omitted result is in
[172.smt.verbose][172.smt2.verbose]):


```
$ dReal --verbose 172.smt2
...
unsat
```

### Proof Checking

**dReal** is also able to generate a proof along with the
\\(\delta\\)-satisfiability result. Using ``--proof`` option generates
the proof [172.smt2.proof][172.smt2.proof].

```
$ dReal --proof 172.smt
unsat
```

We also provide a *proof checker* which can validate the proof for the
*unsat* cases. Our proof-checking process is a semi-algorithm and
therefore its termination is not guaranteed. ``-t`` option shoud be
used to specify the timeout in seconds.

```
$ proofcheck.sh -t 30 172.smt2.proof
...
proof verified
```

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
