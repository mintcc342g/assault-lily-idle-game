import { DEFAULT_BG_COLOR_R, DEFAULT_BG_COLOR_G, DEFAULT_BG_COLOR_B } from '../../consts/css.js';

export const CameraMixin = superclass => class extends superclass {
  initResponsiveScreen() {
    this.rexScaleOuter.add(this.cameras.main);
  }

  fadeIn(delay) {
    this.cameras.main.fadeIn(delay,
      DEFAULT_BG_COLOR_R,
      DEFAULT_BG_COLOR_G,
      DEFAULT_BG_COLOR_B
    );
  }

  fadeOut(delay) {
    this.cameras.main.fadeOut(delay,
      DEFAULT_BG_COLOR_R,
      DEFAULT_BG_COLOR_G,
      DEFAULT_BG_COLOR_B
    );
  }

  sceneStart(name, data) {
    this.scene.start(name, data);
  }
}