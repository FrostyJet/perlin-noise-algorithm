import p5 from "p5";
const rainbowEnabled = false;

class Particle {
  constructor(env) {
    this.env = env;

    this.pos = this.env.createVector(
      env.random(env.width),
      env.random(env.height)
    );
    this.vel = p5.Vector.random2D();
    this.acc = this.env.createVector(0, 0);
    this.maxSpeed = 2;

    this.color = { red: 0, green: 0, blue: 0 };
  }

  show() {
    if (rainbowEnabled) {
      this.color.red += 1;
      if (this.color.red > 255) {
        this.color.red = 0;
      }
    }

    this.env.stroke(this.color.red, 0, 0, 80);

    this.env.strokeWeight(0.1);
    this.env.line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
  }

  update() {
    this.persistPos();
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.limit(this.maxSpeed);

    this.edges();
  }

  persistPos() {
    this.prevPos = this.pos.copy();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    let updated = false;

    if (this.pos.x > this.env.width) {
      this.pos.x = 0;
      updated = true;
    }

    if (this.pos.x < 0) {
      this.pos.x = this.env.width;
      updated = true;
    }

    if (this.pos.y > this.env.height) {
      this.pos.y = 0;
      updated = true;
    }

    if (this.pos.y < 0) {
      this.pos.y = this.env.height;
      updated = true;
    }

    if (updated) {
      this.persistPos();
    }
  }
}

export default Particle;
