import { DEFAULT_BACKGROUND_COLOR_RED, DEFAULT_BACKGROUND_COLOR_GREEN, DEFAULT_BACKGROUND_COLOR_BLUE } from '../../consts/css.js';

export const CameraMixin = superclass => class extends superclass {
  initResponsiveScreen() {
    this.rexScaleOuter.add(this.cameras.main);
  }

  fadeIn(delay) {
    this.cameras.main.fadeIn(delay,
      DEFAULT_BACKGROUND_COLOR_RED,
      DEFAULT_BACKGROUND_COLOR_GREEN,
      DEFAULT_BACKGROUND_COLOR_BLUE
    );
  }

  fadeOut(delay) {
    this.cameras.main.fadeOut(delay,
      DEFAULT_BACKGROUND_COLOR_RED,
      DEFAULT_BACKGROUND_COLOR_GREEN,
      DEFAULT_BACKGROUND_COLOR_BLUE
    );
  }
}