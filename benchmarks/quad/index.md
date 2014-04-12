# Quadcopter Model

We developed a model that contains the full dynamics of a quadcopter.
We use the model to solve control problems by answering reachability
questions. A typical set of the differential equations are the
following:

## Dynamics

\begin{aligned}
\frac{d\omega\_x}{dt} =& L\cdot k\cdot (\omega\_1^2 - \omega\_3^2)(1/I\_{xx})-(I\_{yy} - I\_{zz})\omega\_y\omega\_z/I\_{xx}\\\\
\frac{d\omega\_y}{dt} =& L\cdot k\cdot(\omega\_2^2 - \omega\_4^2)(1/I\_{yy})-(I\_{zz} - I\_{xx})\omega\_x\omega\_z/I\_{yy}\\\\
\frac{d\omega\_z}{dt} =& b\cdot(\omega\_1^2 - \omega\_2^2 + \omega\_3^2 - \omega\_4^2)(1/I\_{zz})-(I\_{xx} - I\_{yy})\omega\_x\omega\_y/I\_{zz}\\\\
\frac{d\phi}{dt}      =& \omega\_x + \displaystyle{\frac{\sin\left(\phi\right) \sin\left(\theta\right)}{{\left(\frac{\sin\left(\phi\right)^{2} \cos\left(\theta\right)}{\cos\left(\phi\right)} + \cos\left(\phi\right) \cos\left(\theta\right)\right)} \cos\left(\phi\right)}}\omega\_y + \displaystyle\frac{\sin\left(\theta\right)}{\frac{\sin\left(\phi\right)^{2} \cos\left(\theta\right)}{\cos\left(\phi\right)} + \cos\left(\phi\right) \cos\left(\theta\right)}\omega\_z\\\\
\frac{d\theta}{dt}    =& -(\displaystyle\frac{\sin\left(\phi\right)^{2} \cos\left(\theta\right)}{{\left(\frac{\sin\left(\phi\right)^{2} \cos\left(\theta\right)}{\cos\left(\phi\right)}\omega\_y + \cos\left(\phi\right) \cos\left(\theta\right)\right)} \cos\left(\phi\right)^{2}} + \frac{1}{\cos\left(\phi\right)})\omega\_y\\\\
                       & -\displaystyle\frac{\sin\left(\phi\right) \cos\left(\theta\right)}{{\left(\frac{\sin\left(\phi\right)^{2} \cos\left(\theta\right)}{\cos\left(\phi\right)} + \cos\left(\phi\right) \cos\left(\theta\right)\right)} \cos\left(\phi\right)}\omega\_z \\\\
\frac{d\psi}{dt}      =& \displaystyle\frac{\sin\left(\phi\right)}{{\left(\frac{\sin\left(\phi\right)^{2} \cos\left(\theta\right)}{\cos\left(\phi\right)} + \cos\left(\phi\right) \cos\left(\theta\right)\right)} \cos\left(\phi\right)}\omega\_y + \displaystyle\frac{1}{\frac{\sin\left(\phi\right)^{2} \cos\left(\theta\right)}{\cos\left(\phi\right)} + \cos\left(\phi\right) \cos\left(\theta\right)}\omega\_z\\\\
\frac{d\dot{x}}{dt}   =& (1/m)(\sin(\theta)\sin(\psi)k(\omega\_1^2 + \omega\_2^2 +\omega\_3^2+\omega\_4^2) - k\cdot d\cdot\dot{x})\\\\
\frac{d\dot{y}}{dt}   =& (1/m)(-\cos(\psi)\sin(\theta)k(\omega\_1^2 + \omega\_2^2 +\omega\_3^2+\omega\_4^2) - k\cdot d\cdot\dot{y})\\\\
\frac{d\dot{z}}{dt}   =& (1/m)(-g-\cos(\theta)k(\omega\_1^2 + \omega\_2^2 +\omega\_3^2+\omega\_4^2) - k\cdot d\cdot \dot{z})
\end{aligned}

- - - - -

## Hybrid System Model

```drh
#define pi	3.14
#define wsqsum  ((w1)^2 + (w2)^2 + (w3)^2 + (w4)^2)

//inertia
#define Ixx	0.0075
#define Iyy	0.0075
#define Izz	0.013

//torques
#define tauphi		L*k*((w1)^2 - (w3)^2)
#define tauthe		L*k*((w2)^2 - (w4)^2)
#define taupsi		b*((w1)^2 - (w2)^2 + (w3)^2 - (w4)^2)

//constants
#define L	0.23
#define kd	7.5e-7
#define k       5.2
#define m	0.650
#define b       3.13e-5
#define g       9.8

[-300, 300] x;
[-300, 300] y;
[-1000, 1000] z;

[0, 1] w1;
[0, 1] w2;
[0, 1] w3;
[0, 1] w4;

[-200, 200] xdot;
[-200, 200] ydot;
[-200, 2000] zdot;

[-1, 1] phi;
[-1, 1] the;
[-1, 1] psi;

[-100, 100] omegax;
[-100, 100] omegay;
[-100, 100] omegaz;

[0,20] time;
[0,20] tau;

{mode 1;
invt:
               (tau >= 0);
               (z <= 500);
flow:
                d/dt[omegax] = tauphi*(1/Ixx)-(Iyy - Izz)*omegay*omegaz/Ixx;
                d/dt[omegay] = tauthe*(1/Iyy)-(Izz - Ixx)*omegax*omegaz/Iyy;
                d/dt[omegaz] = taupsi*(1/Izz)-(Ixx - Iyy)*omegax*omegay/Izz;

                d/dt[phi] = omegax
                            + (sin(phi)*sin(the)/
                              ((sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the))*cos(phi)))*omegay
                            + (sin(the)/(sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the)))*omegaz;

                d/dt[the] = (-sin(phi)^2*cos(the)/((sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the))*cos(phi)^2) + 1/cos(phi))*omegay
                            + (-sin(phi)*cos(the)/((sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the))*cos(phi)))*omegaz;

                d/dt[psi] = (sin(phi)/((sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the))*cos(phi)))*omegay
                            + (1/(sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the)))*omegaz;

                d/dt[xdot] = (1/m)*(sin(the)*sin(psi)*k*wsqsum - kd*xdot);
                d/dt[ydot] = (1/m)*(-cos(psi)*sin(the)*k*wsqsum - kd*ydot);
                d/dt[zdot] = (1/m)*(+g+cos(the)*k*wsqsum + kd*zdot);

                d/dt[x] = xdot;
                d/dt[y] = ydot;
                d/dt[z] = zdot;

                d/dt[w1] = 0;
                d/dt[w2] = 0;
                d/dt[w3] = 0;
                d/dt[w4] = 0;

                d/dt[tau] = 1;

        jump: (z >= 500)
              ==> @2 (and (phi' = phi)
                          (the' = the)
                          (psi' = psi)
                          (omegax' = omegax)
                          (omegay' = omegay)
                          (omegaz' = omegaz)
                          (x' = x)
                          (y' = y)
                          (z' = z)
                          (xdot' = xdot)
                          (ydot' = ydot)
                          (zdot' = zdot)
                          (tau' = tau)
                          (w1' = 0)
                          (w2' = 1)
                          (w3' = 0)
                          (w4' = 1)
                          );
}

{mode 2;
invt:
               (tau >= 0);
               (z <= 900);
               (z >= 200);
flow:
                d/dt[omegax] = tauphi*(1/Ixx)-(Iyy - Izz)*omegay*omegaz/Ixx;
                d/dt[omegay] = tauthe*(1/Iyy)-(Izz - Ixx)*omegax*omegaz/Iyy;
                d/dt[omegaz] = taupsi*(1/Izz)-(Ixx - Iyy)*omegax*omegay/Izz;

                d/dt[phi] = omegax
                            + (sin(phi)*sin(the)/
                              ((sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the))*cos(phi)))*omegay
                            + (sin(the)/(sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the)))*omegaz;

                d/dt[the] = (-sin(phi)^2*cos(the)/((sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the))*cos(phi)^2) + 1/cos(phi))*omegay
                            + (-sin(phi)*cos(the)/((sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the))*cos(phi)))*omegaz;

                d/dt[psi] = (sin(phi)/((sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the))*cos(phi)))*omegay
                            + (1/(sin(phi)^2*cos(the)/cos(phi) + cos(phi)*cos(the)))*omegaz;

                d/dt[xdot] = (1/m)*(sin(the)*sin(psi)*k*wsqsum - kd*xdot);
                d/dt[ydot] = (1/m)*(-cos(psi)*sin(the)*k*wsqsum - kd*ydot);
                d/dt[zdot] = (1/m)*(-g-cos(the)*k*wsqsum - kd*zdot);

                d/dt[x] = xdot;
                d/dt[y] = ydot;
                d/dt[z] = zdot;

                d/dt[w1] = 0;
                d/dt[w2] = 0;
                d/dt[w3] = 0;
                d/dt[w4] = 0;

                d/dt[tau] = 1;

        jump: (z <= 200)
              ==> @1 (and (phi' = phi)
                          (the' = the)
                          (psi' = psi)
                          (omegax' = omegax)
                          (omegay' = omegay)
                          (omegaz' = omegaz)
                          (x' = x)
                          (y' = y)
                          (z' = z)
                          (xdot' = xdot)
                          (ydot' = ydot)
                          (zdot' = zdot)
                          (tau' = tau)
                          (w1' = 1)
                          (w2' = 0)
                          (w3' = 1)
                          (w4' = 0)
                          );
}

init: @1 (and (w1 = 1.0) (w2 = 0.0) (w3 = 1.0) (w4 = 0.0)
              (phi = 0.1) (the = -0.1) (psi = 0.1)
              (omegax = 0.00)
              (omegay = 0.01)
              (omegaz = 0.02)
              (x = 0)
              (y = 0)
              (z >= 220)
              (z <= 230)
              (xdot = 5) (ydot = 5) (zdot = 10)
              (tau = 0));

goal: @1 (and (tau >= 15.0)
              (z = 0)
         );
```

- - - - -

## Logic Encoding
```smt2
(set-logic QF_NRA_ODE)
(declare-fun zdot () Real)
(declare-fun z () Real)
(declare-fun ydot () Real)
(declare-fun y () Real)
(declare-fun xdot () Real)
(declare-fun x () Real)
(declare-fun w4 () Real)
(declare-fun w3 () Real)
(declare-fun w2 () Real)
(declare-fun w1 () Real)
(declare-fun the () Real)
(declare-fun tau () Real)
(declare-fun psi () Real)
(declare-fun phi () Real)
(declare-fun omegaz () Real)
(declare-fun omegay () Real)
(declare-fun omegax () Real)
(declare-fun zdot_0_0 () Real)
(declare-fun zdot_0_t () Real)
(declare-fun zdot_1_0 () Real)
(declare-fun zdot_1_t () Real)
(declare-fun zdot_2_0 () Real)
(declare-fun zdot_2_t () Real)
(declare-fun z_0_0 () Real)
(declare-fun z_0_t () Real)
(declare-fun z_1_0 () Real)
(declare-fun z_1_t () Real)
(declare-fun z_2_0 () Real)
(declare-fun z_2_t () Real)
(declare-fun ydot_0_0 () Real)
(declare-fun ydot_0_t () Real)
(declare-fun ydot_1_0 () Real)
(declare-fun ydot_1_t () Real)
(declare-fun ydot_2_0 () Real)
(declare-fun ydot_2_t () Real)
(declare-fun y_0_0 () Real)
(declare-fun y_0_t () Real)
(declare-fun y_1_0 () Real)
(declare-fun y_1_t () Real)
(declare-fun y_2_0 () Real)
(declare-fun y_2_t () Real)
(declare-fun xdot_0_0 () Real)
(declare-fun xdot_0_t () Real)
(declare-fun xdot_1_0 () Real)
(declare-fun xdot_1_t () Real)
(declare-fun xdot_2_0 () Real)
(declare-fun xdot_2_t () Real)
(declare-fun x_0_0 () Real)
(declare-fun x_0_t () Real)
(declare-fun x_1_0 () Real)
(declare-fun x_1_t () Real)
(declare-fun x_2_0 () Real)
(declare-fun x_2_t () Real)
(declare-fun w4_0_0 () Real)
(declare-fun w4_0_t () Real)
(declare-fun w4_1_0 () Real)
(declare-fun w4_1_t () Real)
(declare-fun w4_2_0 () Real)
(declare-fun w4_2_t () Real)
(declare-fun w3_0_0 () Real)
(declare-fun w3_0_t () Real)
(declare-fun w3_1_0 () Real)
(declare-fun w3_1_t () Real)
(declare-fun w3_2_0 () Real)
(declare-fun w3_2_t () Real)
(declare-fun w2_0_0 () Real)
(declare-fun w2_0_t () Real)
(declare-fun w2_1_0 () Real)
(declare-fun w2_1_t () Real)
(declare-fun w2_2_0 () Real)
(declare-fun w2_2_t () Real)
(declare-fun w1_0_0 () Real)
(declare-fun w1_0_t () Real)
(declare-fun w1_1_0 () Real)
(declare-fun w1_1_t () Real)
(declare-fun w1_2_0 () Real)
(declare-fun w1_2_t () Real)
(declare-fun the_0_0 () Real)
(declare-fun the_0_t () Real)
(declare-fun the_1_0 () Real)
(declare-fun the_1_t () Real)
(declare-fun the_2_0 () Real)
(declare-fun the_2_t () Real)
(declare-fun tau_0_0 () Real)
(declare-fun tau_0_t () Real)
(declare-fun tau_1_0 () Real)
(declare-fun tau_1_t () Real)
(declare-fun tau_2_0 () Real)
(declare-fun tau_2_t () Real)
(declare-fun psi_0_0 () Real)
(declare-fun psi_0_t () Real)
(declare-fun psi_1_0 () Real)
(declare-fun psi_1_t () Real)
(declare-fun psi_2_0 () Real)
(declare-fun psi_2_t () Real)
(declare-fun phi_0_0 () Real)
(declare-fun phi_0_t () Real)
(declare-fun phi_1_0 () Real)
(declare-fun phi_1_t () Real)
(declare-fun phi_2_0 () Real)
(declare-fun phi_2_t () Real)
(declare-fun omegaz_0_0 () Real)
(declare-fun omegaz_0_t () Real)
(declare-fun omegaz_1_0 () Real)
(declare-fun omegaz_1_t () Real)
(declare-fun omegaz_2_0 () Real)
(declare-fun omegaz_2_t () Real)
(declare-fun omegay_0_0 () Real)
(declare-fun omegay_0_t () Real)
(declare-fun omegay_1_0 () Real)
(declare-fun omegay_1_t () Real)
(declare-fun omegay_2_0 () Real)
(declare-fun omegay_2_t () Real)
(declare-fun omegax_0_0 () Real)
(declare-fun omegax_0_t () Real)
(declare-fun omegax_1_0 () Real)
(declare-fun omegax_1_t () Real)
(declare-fun omegax_2_0 () Real)
(declare-fun omegax_2_t () Real)
(declare-fun time_0 () Real)
(declare-fun time_1 () Real)
(declare-fun time_2 () Real)
(declare-fun mode_0 () Real)
(declare-fun mode_1 () Real)
(declare-fun mode_2 () Real)
(define-ode flow_1 ((= d/dt[omegax] (- (* (* (* 0.230000 5.200000) (- (^ w1 2.000000) (^ w3 2.000000))) (/ 1.000000 0.007500)) (/ (* (* (- 0.007500 0.013000) omegay) omegaz) 0.007500))) (= d/dt[omegay] (- (* (* (* 0.230000 5.200000) (- (^ w2 2.000000) (^ w4 2.000000))) (/ 1.000000 0.007500)) (/ (* (* (- 0.013000 0.007500) omegax) omegaz) 0.007500))) (= d/dt[omegaz] (- (* (* 0.000031 (- (+ (- (^ w1 2.000000) (^ w2 2.000000)) (^ w3 2.000000)) (^ w4 2.000000))) (/ 1.000000 0.013000)) (/ (* (* (- 0.007500 0.007500) omegax) omegay) 0.013000))) (= d/dt[phi] (+ (+ omegax (* (/ (* (sin phi) (sin the)) (* (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the))) (cos phi))) omegay)) (* (/ (sin the) (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the)))) omegaz))) (= d/dt[the] (+ (* (+ (/ (* (- 0.000000 (^ (sin phi) 2.000000)) (cos the)) (* (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the))) (^ (cos phi) 2.000000))) (/ 1.000000 (cos phi))) omegay) (* (/ (* (- 0.000000 (sin phi)) (cos the)) (* (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the))) (cos phi))) omegaz))) (= d/dt[psi] (+ (* (/ (sin phi) (* (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the))) (cos phi))) omegay) (* (/ 1.000000 (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the)))) omegaz))) (= d/dt[xdot] (* (/ 1.000000 0.650000) (- (* (* (* (sin the) (sin psi)) 5.200000) (+ (+ (+ (^ w1 2.000000) (^ w2 2.000000)) (^ w3 2.000000)) (^ w4 2.000000))) (* 0.000001 xdot)))) (= d/dt[ydot] (* (/ 1.000000 0.650000) (- (* (* (* (- 0.000000 (cos psi)) (sin the)) 5.200000) (+ (+ (+ (^ w1 2.000000) (^ w2 2.000000)) (^ w3 2.000000)) (^ w4 2.000000))) (* 0.000001 ydot)))) (= d/dt[zdot] (* (/ 1.000000 0.650000) (+ (+ 9.800000 (* (* (cos the) 5.200000) (+ (+ (+ (^ w1 2.000000) (^ w2 2.000000)) (^ w3 2.000000)) (^ w4 2.000000)))) (* 0.000001 zdot)))) (= d/dt[x] xdot) (= d/dt[y] ydot) (= d/dt[z] zdot) (= d/dt[w1] 0.000000) (= d/dt[w2] 0.000000) (= d/dt[w3] 0.000000) (= d/dt[w4] 0.000000) (= d/dt[tau] 1.000000)))
(define-ode flow_2 ((= d/dt[omegax] (- (* (* (* 0.230000 5.200000) (- (^ w1 2.000000) (^ w3 2.000000))) (/ 1.000000 0.007500)) (/ (* (* (- 0.007500 0.013000) omegay) omegaz) 0.007500))) (= d/dt[omegay] (- (* (* (* 0.230000 5.200000) (- (^ w2 2.000000) (^ w4 2.000000))) (/ 1.000000 0.007500)) (/ (* (* (- 0.013000 0.007500) omegax) omegaz) 0.007500))) (= d/dt[omegaz] (- (* (* 0.000031 (- (+ (- (^ w1 2.000000) (^ w2 2.000000)) (^ w3 2.000000)) (^ w4 2.000000))) (/ 1.000000 0.013000)) (/ (* (* (- 0.007500 0.007500) omegax) omegay) 0.013000))) (= d/dt[phi] (+ (+ omegax (* (/ (* (sin phi) (sin the)) (* (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the))) (cos phi))) omegay)) (* (/ (sin the) (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the)))) omegaz))) (= d/dt[the] (+ (* (+ (/ (* (- 0.000000 (^ (sin phi) 2.000000)) (cos the)) (* (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the))) (^ (cos phi) 2.000000))) (/ 1.000000 (cos phi))) omegay) (* (/ (* (- 0.000000 (sin phi)) (cos the)) (* (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the))) (cos phi))) omegaz))) (= d/dt[psi] (+ (* (/ (sin phi) (* (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the))) (cos phi))) omegay) (* (/ 1.000000 (+ (/ (* (^ (sin phi) 2.000000) (cos the)) (cos phi)) (* (cos phi) (cos the)))) omegaz))) (= d/dt[xdot] (* (/ 1.000000 0.650000) (- (* (* (* (sin the) (sin psi)) 5.200000) (+ (+ (+ (^ w1 2.000000) (^ w2 2.000000)) (^ w3 2.000000)) (^ w4 2.000000))) (* 0.000001 xdot)))) (= d/dt[ydot] (* (/ 1.000000 0.650000) (- (* (* (* (- 0.000000 (cos psi)) (sin the)) 5.200000) (+ (+ (+ (^ w1 2.000000) (^ w2 2.000000)) (^ w3 2.000000)) (^ w4 2.000000))) (* 0.000001 ydot)))) (= d/dt[zdot] (* (/ 1.000000 0.650000) (- (- -9.800000 (* (* (cos the) 5.200000) (+ (+ (+ (^ w1 2.000000) (^ w2 2.000000)) (^ w3 2.000000)) (^ w4 2.000000)))) (* 0.000001 zdot)))) (= d/dt[x] xdot) (= d/dt[y] ydot) (= d/dt[z] zdot) (= d/dt[w1] 0.000000) (= d/dt[w2] 0.000000) (= d/dt[w3] 0.000000) (= d/dt[w4] 0.000000) (= d/dt[tau] 1.000000)))
(assert (<= -200.000000 zdot_0_0))
(assert (<= zdot_0_0 2000.000000))
(assert (<= -200.000000 zdot_0_t))
(assert (<= zdot_0_t 2000.000000))
(assert (<= -200.000000 zdot_1_0))
(assert (<= zdot_1_0 2000.000000))
(assert (<= -200.000000 zdot_1_t))
(assert (<= zdot_1_t 2000.000000))
(assert (<= -200.000000 zdot_2_0))
(assert (<= zdot_2_0 2000.000000))
(assert (<= -200.000000 zdot_2_t))
(assert (<= zdot_2_t 2000.000000))
(assert (<= -1000.000000 z_0_0))
(assert (<= z_0_0 1000.000000))
(assert (<= -1000.000000 z_0_t))
(assert (<= z_0_t 1000.000000))
(assert (<= -1000.000000 z_1_0))
(assert (<= z_1_0 1000.000000))
(assert (<= -1000.000000 z_1_t))
(assert (<= z_1_t 1000.000000))
(assert (<= -1000.000000 z_2_0))
(assert (<= z_2_0 1000.000000))
(assert (<= -1000.000000 z_2_t))
(assert (<= z_2_t 1000.000000))
(assert (<= -200.000000 ydot_0_0))
(assert (<= ydot_0_0 200.000000))
(assert (<= -200.000000 ydot_0_t))
(assert (<= ydot_0_t 200.000000))
(assert (<= -200.000000 ydot_1_0))
(assert (<= ydot_1_0 200.000000))
(assert (<= -200.000000 ydot_1_t))
(assert (<= ydot_1_t 200.000000))
(assert (<= -200.000000 ydot_2_0))
(assert (<= ydot_2_0 200.000000))
(assert (<= -200.000000 ydot_2_t))
(assert (<= ydot_2_t 200.000000))
(assert (<= -300.000000 y_0_0))
(assert (<= y_0_0 300.000000))
(assert (<= -300.000000 y_0_t))
(assert (<= y_0_t 300.000000))
(assert (<= -300.000000 y_1_0))
(assert (<= y_1_0 300.000000))
(assert (<= -300.000000 y_1_t))
(assert (<= y_1_t 300.000000))
(assert (<= -300.000000 y_2_0))
(assert (<= y_2_0 300.000000))
(assert (<= -300.000000 y_2_t))
(assert (<= y_2_t 300.000000))
(assert (<= -200.000000 xdot_0_0))
(assert (<= xdot_0_0 200.000000))
(assert (<= -200.000000 xdot_0_t))
(assert (<= xdot_0_t 200.000000))
(assert (<= -200.000000 xdot_1_0))
(assert (<= xdot_1_0 200.000000))
(assert (<= -200.000000 xdot_1_t))
(assert (<= xdot_1_t 200.000000))
(assert (<= -200.000000 xdot_2_0))
(assert (<= xdot_2_0 200.000000))
(assert (<= -200.000000 xdot_2_t))
(assert (<= xdot_2_t 200.000000))
(assert (<= -300.000000 x_0_0))
(assert (<= x_0_0 300.000000))
(assert (<= -300.000000 x_0_t))
(assert (<= x_0_t 300.000000))
(assert (<= -300.000000 x_1_0))
(assert (<= x_1_0 300.000000))
(assert (<= -300.000000 x_1_t))
(assert (<= x_1_t 300.000000))
(assert (<= -300.000000 x_2_0))
(assert (<= x_2_0 300.000000))
(assert (<= -300.000000 x_2_t))
(assert (<= x_2_t 300.000000))
(assert (<= 0.000000 w4_0_0))
(assert (<= w4_0_0 1.000000))
(assert (<= 0.000000 w4_0_t))
(assert (<= w4_0_t 1.000000))
(assert (<= 0.000000 w4_1_0))
(assert (<= w4_1_0 1.000000))
(assert (<= 0.000000 w4_1_t))
(assert (<= w4_1_t 1.000000))
(assert (<= 0.000000 w4_2_0))
(assert (<= w4_2_0 1.000000))
(assert (<= 0.000000 w4_2_t))
(assert (<= w4_2_t 1.000000))
(assert (<= 0.000000 w3_0_0))
(assert (<= w3_0_0 1.000000))
(assert (<= 0.000000 w3_0_t))
(assert (<= w3_0_t 1.000000))
(assert (<= 0.000000 w3_1_0))
(assert (<= w3_1_0 1.000000))
(assert (<= 0.000000 w3_1_t))
(assert (<= w3_1_t 1.000000))
(assert (<= 0.000000 w3_2_0))
(assert (<= w3_2_0 1.000000))
(assert (<= 0.000000 w3_2_t))
(assert (<= w3_2_t 1.000000))
(assert (<= 0.000000 w2_0_0))
(assert (<= w2_0_0 1.000000))
(assert (<= 0.000000 w2_0_t))
(assert (<= w2_0_t 1.000000))
(assert (<= 0.000000 w2_1_0))
(assert (<= w2_1_0 1.000000))
(assert (<= 0.000000 w2_1_t))
(assert (<= w2_1_t 1.000000))
(assert (<= 0.000000 w2_2_0))
(assert (<= w2_2_0 1.000000))
(assert (<= 0.000000 w2_2_t))
(assert (<= w2_2_t 1.000000))
(assert (<= 0.000000 w1_0_0))
(assert (<= w1_0_0 1.000000))
(assert (<= 0.000000 w1_0_t))
(assert (<= w1_0_t 1.000000))
(assert (<= 0.000000 w1_1_0))
(assert (<= w1_1_0 1.000000))
(assert (<= 0.000000 w1_1_t))
(assert (<= w1_1_t 1.000000))
(assert (<= 0.000000 w1_2_0))
(assert (<= w1_2_0 1.000000))
(assert (<= 0.000000 w1_2_t))
(assert (<= w1_2_t 1.000000))
(assert (<= -1.000000 the_0_0))
(assert (<= the_0_0 1.000000))
(assert (<= -1.000000 the_0_t))
(assert (<= the_0_t 1.000000))
(assert (<= -1.000000 the_1_0))
(assert (<= the_1_0 1.000000))
(assert (<= -1.000000 the_1_t))
(assert (<= the_1_t 1.000000))
(assert (<= -1.000000 the_2_0))
(assert (<= the_2_0 1.000000))
(assert (<= -1.000000 the_2_t))
(assert (<= the_2_t 1.000000))
(assert (<= 0.000000 tau_0_0))
(assert (<= tau_0_0 20.000000))
(assert (<= 0.000000 tau_0_t))
(assert (<= tau_0_t 20.000000))
(assert (<= 0.000000 tau_1_0))
(assert (<= tau_1_0 20.000000))
(assert (<= 0.000000 tau_1_t))
(assert (<= tau_1_t 20.000000))
(assert (<= 0.000000 tau_2_0))
(assert (<= tau_2_0 20.000000))
(assert (<= 0.000000 tau_2_t))
(assert (<= tau_2_t 20.000000))
(assert (<= -1.000000 psi_0_0))
(assert (<= psi_0_0 1.000000))
(assert (<= -1.000000 psi_0_t))
(assert (<= psi_0_t 1.000000))
(assert (<= -1.000000 psi_1_0))
(assert (<= psi_1_0 1.000000))
(assert (<= -1.000000 psi_1_t))
(assert (<= psi_1_t 1.000000))
(assert (<= -1.000000 psi_2_0))
(assert (<= psi_2_0 1.000000))
(assert (<= -1.000000 psi_2_t))
(assert (<= psi_2_t 1.000000))
(assert (<= -1.000000 phi_0_0))
(assert (<= phi_0_0 1.000000))
(assert (<= -1.000000 phi_0_t))
(assert (<= phi_0_t 1.000000))
(assert (<= -1.000000 phi_1_0))
(assert (<= phi_1_0 1.000000))
(assert (<= -1.000000 phi_1_t))
(assert (<= phi_1_t 1.000000))
(assert (<= -1.000000 phi_2_0))
(assert (<= phi_2_0 1.000000))
(assert (<= -1.000000 phi_2_t))
(assert (<= phi_2_t 1.000000))
(assert (<= -100.000000 omegaz_0_0))
(assert (<= omegaz_0_0 100.000000))
(assert (<= -100.000000 omegaz_0_t))
(assert (<= omegaz_0_t 100.000000))
(assert (<= -100.000000 omegaz_1_0))
(assert (<= omegaz_1_0 100.000000))
(assert (<= -100.000000 omegaz_1_t))
(assert (<= omegaz_1_t 100.000000))
(assert (<= -100.000000 omegaz_2_0))
(assert (<= omegaz_2_0 100.000000))
(assert (<= -100.000000 omegaz_2_t))
(assert (<= omegaz_2_t 100.000000))
(assert (<= -100.000000 omegay_0_0))
(assert (<= omegay_0_0 100.000000))
(assert (<= -100.000000 omegay_0_t))
(assert (<= omegay_0_t 100.000000))
(assert (<= -100.000000 omegay_1_0))
(assert (<= omegay_1_0 100.000000))
(assert (<= -100.000000 omegay_1_t))
(assert (<= omegay_1_t 100.000000))
(assert (<= -100.000000 omegay_2_0))
(assert (<= omegay_2_0 100.000000))
(assert (<= -100.000000 omegay_2_t))
(assert (<= omegay_2_t 100.000000))
(assert (<= -100.000000 omegax_0_0))
(assert (<= omegax_0_0 100.000000))
(assert (<= -100.000000 omegax_0_t))
(assert (<= omegax_0_t 100.000000))
(assert (<= -100.000000 omegax_1_0))
(assert (<= omegax_1_0 100.000000))
(assert (<= -100.000000 omegax_1_t))
(assert (<= omegax_1_t 100.000000))
(assert (<= -100.000000 omegax_2_0))
(assert (<= omegax_2_0 100.000000))
(assert (<= -100.000000 omegax_2_t))
(assert (<= omegax_2_t 100.000000))
(assert (<= 0.000000 time_0))
(assert (<= time_0 20.000000))
(assert (<= 0.000000 time_1))
(assert (<= time_1 20.000000))
(assert (<= 0.000000 time_2))
(assert (<= time_2 20.000000))
(assert (<= 1.000000 mode_0))
(assert (<= mode_0 2.000000))
(assert (<= 1.000000 mode_1))
(assert (<= mode_1 2.000000))
(assert (<= 1.000000 mode_2))
(assert (<= mode_2 2.000000))
(assert (and (and (= tau_0_0 0.000000) (= zdot_0_0 10.000000) (= ydot_0_0 5.000000) (= xdot_0_0 5.000000) (<= z_0_0 230.000000) (>= z_0_0 220.000000) (= y_0_0 0.000000) (= x_0_0 0.000000) (= omegaz_0_0 0.020000) (= omegay_0_0 0.010000) (= omegax_0_0 0.000000) (= psi_0_0 0.100000) (= the_0_0 -0.100000) (= phi_0_0 0.100000) (= w4_0_0 0.000000) (= w3_0_0 1.000000) (= w2_0_0 0.000000) (= w1_0_0 1.000000)) (= mode_0 1.000000) (= [zdot_0_t z_0_t ydot_0_t y_0_t xdot_0_t x_0_t w4_0_t w3_0_t w2_0_t w1_0_t the_0_t tau_0_t psi_0_t phi_0_t omegaz_0_t omegay_0_t omegax_0_t] (integral 0. time_0 [zdot_0_0 z_0_0 ydot_0_0 y_0_0 xdot_0_0 x_0_0 w4_0_0 w3_0_0 w2_0_0 w1_0_0 the_0_0 tau_0_0 psi_0_0 phi_0_0 omegaz_0_0 omegay_0_0 omegax_0_0] flow_1)) (= mode_0 1.000000) (forall_t 1.000000 [0.000000 time_0] (>= tau_0_t 0.000000)) (>= tau_0_t 0.000000) (>= tau_0_0 0.000000) (forall_t 1.000000 [0.000000 time_0] (<= z_0_t 500.000000)) (<= z_0_t 500.000000) (<= z_0_0 500.000000) (= mode_1 2.000000) (>= z_0_t 500.000000) (= w4_1_0 1.000000) (= w3_1_0 0.000000) (= w2_1_0 1.000000) (= w1_1_0 0.000000) (= tau_1_0 tau_0_t) (= zdot_1_0 zdot_0_t) (= ydot_1_0 ydot_0_t) (= xdot_1_0 xdot_0_t) (= z_1_0 z_0_t) (= y_1_0 y_0_t) (= x_1_0 x_0_t) (= omegaz_1_0 omegaz_0_t) (= omegay_1_0 omegay_0_t) (= omegax_1_0 omegax_0_t) (= psi_1_0 psi_0_t) (= the_1_0 the_0_t) (= phi_1_0 phi_0_t) (= [zdot_1_t z_1_t ydot_1_t y_1_t xdot_1_t x_1_t w4_1_t w3_1_t w2_1_t w1_1_t the_1_t tau_1_t psi_1_t phi_1_t omegaz_1_t omegay_1_t omegax_1_t] (integral 0. time_1 [zdot_1_0 z_1_0 ydot_1_0 y_1_0 xdot_1_0 x_1_0 w4_1_0 w3_1_0 w2_1_0 w1_1_0 the_1_0 tau_1_0 psi_1_0 phi_1_0 omegaz_1_0 omegay_1_0 omegax_1_0] flow_2)) (= mode_1 2.000000) (forall_t 2.000000 [0.000000 time_1] (>= tau_1_t 0.000000)) (>= tau_1_t 0.000000) (>= tau_1_0 0.000000) (forall_t 2.000000 [0.000000 time_1] (<= z_1_t 900.000000)) (<= z_1_t 900.000000) (<= z_1_0 900.000000) (forall_t 2.000000 [0.000000 time_1] (>= z_1_t 200.000000)) (>= z_1_t 200.000000) (>= z_1_0 200.000000) (= mode_2 1.000000) (<= z_1_t 200.000000) (= w4_2_0 0.000000) (= w3_2_0 1.000000) (= w2_2_0 0.000000) (= w1_2_0 1.000000) (= tau_2_0 tau_1_t) (= zdot_2_0 zdot_1_t) (= ydot_2_0 ydot_1_t) (= xdot_2_0 xdot_1_t) (= z_2_0 z_1_t) (= y_2_0 y_1_t) (= x_2_0 x_1_t) (= omegaz_2_0 omegaz_1_t) (= omegay_2_0 omegay_1_t) (= omegax_2_0 omegax_1_t) (= psi_2_0 psi_1_t) (= the_2_0 the_1_t) (= phi_2_0 phi_1_t) (= [zdot_2_t z_2_t ydot_2_t y_2_t xdot_2_t x_2_t w4_2_t w3_2_t w2_2_t w1_2_t the_2_t tau_2_t psi_2_t phi_2_t omegaz_2_t omegay_2_t omegax_2_t] (integral 0. time_2 [zdot_2_0 z_2_0 ydot_2_0 y_2_0 xdot_2_0 x_2_0 w4_2_0 w3_2_0 w2_2_0 w1_2_0 the_2_0 tau_2_0 psi_2_0 phi_2_0 omegaz_2_0 omegay_2_0 omegax_2_0] flow_1)) (= mode_2 1.000000) (forall_t 1.000000 [0.000000 time_2] (>= tau_2_t 0.000000)) (>= tau_2_t 0.000000) (>= tau_2_0 0.000000) (forall_t 1.000000 [0.000000 time_2] (<= z_2_t 500.000000)) (<= z_2_t 500.000000) (<= z_2_0 500.000000) (= mode_2 1.000000) (= z_2_t 0.000000) (>= tau_2_t 15.000000)))
(check-sat)
(exit)
```

- - - - -

## Result

<script src="/js/d3.v3.js"></script>
<script src="/js/underscore-min.js"></script>
<div id="chart-container" style="text-align:center">
<script type="text/javascript" src="/benchmarks/quad/data.js"></script>
<script type="text/javascript" src="/js/vis.js"></script>
</div>

- - - - -

## Reference
 - **Quadcopter Dynamics, Simulation, and Control**, Andrew Gibiansky.
   [[pdf][quadcopter_pdf]]/[[blog][quadcopter_blog]]

[quadcopter_pdf]: http://andrew.gibiansky.com/downloads/pdf/Quadcopter%20Dynamics,%20Simulation,%20and%20Control.pdf
[quadcopter_blog]: http://andrew.gibiansky.com/blog/physics/quadcopter-dynamics/
