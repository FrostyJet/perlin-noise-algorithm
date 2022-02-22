import p5 from "p5";
import Particle from "./particle";
import Fps from "./fps";

const sketch = (env) => {
  with (env) {
    const width = 800;
    const height = 600;

    // scale the canvas
    const scl = 20;
    const cols = floor(width / scl);
    const rows = floor(height / scl);

    let zoff = 0;
    let velocity = 0.1;
    let totalParticles = 1000;

    let particles = [];
    let vectors = [];

    let fps = new Fps(env);

    const createParticles = () => {
      for (let i = 0; i < totalParticles; i++) {
        particles.push(new Particle(env));
      }
    };

    const getFlatIndex = (x, y) => x + y * cols;

    const getVector = (x, y) => vectors[getFlatIndex(x, y)];

    const moveParticles = () => {
      particles.forEach((p) => {
        p.update();
        p.show();

        const x = floor(p.pos.x / scl);
        const y = floor(p.pos.y / scl);
        p.applyForce(getVector(x, y));
      });
    };

    env.setup = () => {
      createCanvas(width, height);
      pixelDensity(1);

      colorMode(HSB, 255);
      background(255);

      createParticles();
      fps.show();
    };

    env.draw = () => {
      let yoff = 0;

      for (let y = 0; y < rows; y++) {
        let xoff = 0;

        for (let x = 0; x < cols; x++) {
          const angle = noise(xoff, yoff, zoff) * TWO_PI;
          const index = getFlatIndex(x, y);

          vectors[index] = p5.Vector.fromAngle(angle).setMag(5);
          xoff += velocity;
        }

        yoff += velocity;
      }

      zoff += velocity / 10;

      moveParticles();
      fps.update();
    };
  }
};

export default sketch;
