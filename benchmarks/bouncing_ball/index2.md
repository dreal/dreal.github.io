\paragraph{Electronic Oscillator.} The EO model represents an electronic oscillator model that contains nonlinear ODEs such as the following:
\begin{aligned}
\frac{dx}{dt}       =& - ax \cdot sin(\omega_1 \cdot \tau)\\\\
\frac{dy}{dt}       =& - ay \cdot sin( (\omega_1 + c_1) \cdot \tau) \cdot sin(\omega_2)\cdot 2\\\\
\frac{dz}{dt}       =& - az \cdot sin( (\omega_2 + c_2) \cdot \tau) \cdot cos(\omega_1)\cdot 2\\\\
\frac{\omega_1}{dt} =& - c_3\cdot \omega_1\\\\
\frac{\omega_2}{dt} =& - c_4\cdot\omega_2\\\\
\frac{d\tau}{dt}    =& 1
\end{aligned}
