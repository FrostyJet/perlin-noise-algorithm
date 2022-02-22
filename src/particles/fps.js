class Fps {
  constructor(env) {
    this.env = env;
    this.fr = null;
  }

  show() {
    this.fr = this.env.createP();
  }

  update() {
    this.fr.html(Math.floor(this.env.frameRate()) + " fps");
  }
}

export default Fps;
