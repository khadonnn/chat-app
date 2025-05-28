#fix

> not use: useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
> useRopeJoint(fixed, j1, {
> anchorA: [0, 0, 0],
> anchorB: [0, 0, 0],
> length: 1,
> });
