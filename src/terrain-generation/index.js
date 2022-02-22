import p5 from "p5";
import sketch from "./sketch";

const init = () => {
  return new p5(sketch);
};

export default {
  init,
};
