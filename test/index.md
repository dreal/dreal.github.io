[gimmick: math]()

We developed a model that contains the full dynamics of a quadcopter.
We use the model to solve control problems by answering reachability
questions. A typical set of the differential equations are the
following:

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
\frac{d\dot{z}}{dt}   =& (1/m)(-g-\cos(\theta)k(\omega\_1^2 + \omega\_2^2 +\omega\_3^2+\omega\_4^2) - k\cdot d\cdot \dot{z})\\\\
\frac{dx}{dt}         =& \dot{x}\\\\
\frac{dy}{dt}         =& \dot{y}\\\\
\frac{dz}{dt}         =& \dot{z}
\end{aligned}
