const sketch = (env) => {
  with (env) {
    const width = 600;
    const height = 600;

    const terrain = {
      width: width * 2.5,
      height: height * 3,
    };

    const scl = 20;
    const cols = floor(terrain.width / scl);
    const rows = floor(terrain.height / scl);

    const uuid = Math.random() * 100;

    const bumps = Array.from(
      {
        length: cols,
      },
      () => []
    );

    let startY = 0;
    let speedY = 0;

    let startX = 0;
    let speedX = 0;

    const updateTerrain = () => {
      let yoff = startY;

      for (let y = 0; y < rows - 1; y++) {
        let xoff = startX;

        for (let x = 0; x < cols; x++) {
          bumps[x][y] = floor(map(noise(xoff, yoff), 0, 1, -100, 100));
          xoff += 0.1;
        }
        yoff += 0.1;
      }

      startY += speedY;
      startX += speedX;
    };

    const displayHints = () => {
      let p = createP("Use arrows to move around the field");
      p.style("font-size", "26px");
      p.position(10, 20);
    };

    env.setup = () => {
      displayHints();
      createCanvas(width, height, WEBGL);

      document.addEventListener("keydown", (e) => {
        e = e || window.event;

        console.log(uuid);

        if (e.keyCode == "38") {
          // up arrow
          speedY = -0.15;
        } else if (e.keyCode == "40") {
          // down arrow
          speedY = 0.15;
        } else if (e.keyCode == "37") {
          speedX = -0.15;
          // left arrow
        } else if (e.keyCode == "39") {
          // right arrow
          speedX = 0.15;
        }
      });

      document.addEventListener("keyup", (e) => {
        speedY = 0;
        speedX = 0;
      });
    };

    env.draw = () => {
      background(255);

      updateTerrain();

      rotateX(PI / 3);
      translate(-terrain.width / 2, -terrain.height / 2 + 200);

      stroke(0);
      fill(169, 167, 167);

      for (let y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        {
          for (let x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, bumps[x][y]);
            vertex(x * scl, (y + 1) * scl, bumps[x][y + 1]);
          }
        }
        endShape();
      }
    };
  }
};

export default sketch;
