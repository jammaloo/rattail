// module aliases

// eslint-disable-next-line no-undef
const { Engine } = Matter;
const { Render } = Matter;
const { Runner } = Matter;
const { Bodies } = Matter;
const { Composite } = Matter;
const { MouseConstraint } = Matter;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: 1000,
    height: 1000,
  },
});
const mouseConstraint = MouseConstraint.create(engine, { element: document.querySelector('body') });

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const gbottom = Bodies.rectangle(500, 1010, 1010, 60, { isStatic: true });
const gleft = Bodies.rectangle(10, 500, 60, 1010, { isStatic: true });
const gright = Bodies.rectangle(1010, 500, 60, 1010, { isStatic: true });
const gtop = Bodies.rectangle(500, 10, 1010, 60, { isStatic: true });
const stack = [ryan, boxB, gbottom, gleft, gright, gtop];
Composite.add(engine.world, [stack, mouseConstraint]);
// add all of the bodies to the world
Composite.add(engine.world, stack);

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
