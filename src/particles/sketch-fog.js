const sketch = (s) => {
  const width = 400;
  const height = 400;

  const velocity = 0.01;
  let start = 0;

  s.setup = () => {
    s.createCanvas(width, height);
    s.pixelDensity(1);
    s.noiseDetail(8, 0.6);
  };

  s.draw = () => {
    s.loadPixels();

    let yoff = 0;

    for (let y = 0; y < height; y++) {
      let xoff = start;
      for (let x = 0; x < width; x++) {
        const index = (x + y * width) * 4;
        let r = s.noise(xoff, yoff) * 255;

        s.pixels[index + 0] = r;
        s.pixels[index + 1] = r;
        s.pixels[index + 2] = r;
        s.pixels[index + 3] = 255;

        xoff += velocity;
      }
      yoff += velocity;
    }

    start += 0.01;
    s.updatePixels();
  };
};

export default sketch;
