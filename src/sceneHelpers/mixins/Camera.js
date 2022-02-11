import * as css from '../../consts/css.js';

export const CameraMixin = superclass => class extends superclass {
  initResponsiveScreen() {
    this.rexScaleOuter.add(this.cameras.main);
  }

  fadeIn(delay) {
    this.cameras.main.fadeIn(delay,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );
  }

  fadeOut(delay) {
    this.cameras.main.fadeOut(delay,
      css.DEFAULT_BACKGROUND_COLOR_RED,
      css.DEFAULT_BACKGROUND_COLOR_GREEN,
      css.DEFAULT_BACKGROUND_COLOR_BLUE
    );
  }
}