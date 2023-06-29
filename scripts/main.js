// module aliases

// eslint-disable-next-line no-undef
const {
  Engine, Render, Runner, Bodies, Composite, MouseConstraint, Composites, Body, Constraint,
} = Matter;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: 1000,
    height: 1000,
    wireframes: false,
    background: '#ffffff',
  },
});
const mouseConstraint = MouseConstraint.create(engine, { element: document.querySelector('body') });

const elyse = Bodies.circle(500, 200, 121, {
  render: {
    strokeStyle: '#ffffff',
    sprite: {
      texture: 'images/elyse.png',
      xScale: 1,
      yScale: 1,
    },
  },
  isStatic: true,
});

// add bodies
const group = Body.nextGroup(true);

const ryan = Bodies.circle(500, 100, 35, {
  render: {
    strokeStyle: '#ffffff',
    sprite: {
      texture: 'images/ryan.png',
      xScale: 0.1,
      yScale: 0.1,
      xOffset: 0.5,
    },
  },
});
const ropeA = Composites.stack(510, 265, 8, 1, 10, 10, (x, y, i) => {
  const isRyan = i === 7;
  if (isRyan) {
    return ryan;
  }
  return Bodies.rectangle(x, y, 25, 12, {
    collisionFilter: { group },
    render: {
      sprite: {
        texture: 'images/tail.png',
        yScale: 0.5,
      },
    },
  });
});

Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
  stiffness: 0.8,
  length: 2,
  render: {
    strokeStyle: '#171a18', anchors: false,
  },
});
Composite.add(ropeA, Constraint.create({
  bodyB: ropeA.bodies[0],
  pointB: { x: -25, y: 0 },
  pointA: { x: 510, y: 265 },
  stiffness: 0.5,
  render: {
    strokeStyle: '#171a18',
    anchors: false,
  },
}));

const stack = [elyse, ropeA];
Composite.add(engine.world, [...stack, mouseConstraint]);
// add all of the bodies to the world

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
