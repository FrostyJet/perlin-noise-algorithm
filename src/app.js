import particlesApp from "./particles";
import terrainGeneratorApp from "./terrain-generation";

window.onload = function () {
  const apps = {
    particles: particlesApp,
    terrain: terrainGeneratorApp,
  };

  let instance = terrainGeneratorApp.init();

  let buttons = document.querySelectorAll(".switch-app");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let appName = button.dataset.app;

      instance.remove();
      instance = apps[appName].init();
    });
  });
};
