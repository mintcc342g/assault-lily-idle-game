import Phaser from 'phaser';
import compose from 'lodash/fp/compose';
import * as configs from '../consts/configs.js';
import { AnimMixin } from './mixins/Animation.js';
import { BaseEventMixin } from './mixins/BaseEvent.js';
import { CameraMixin } from './mixins/Camera.js';
import { GraphicMixin } from './mixins/Graphic.js';
import { TextBoxMixin } from './mixins/TextBox.js';

class BaseSetting extends CameraMixin(Phaser.Scene) {
  constructor(name) {
    super(name);
    this.name = name;
    this.lang = configs.LANG_KR; // default language
    this.customAnim = {
      button: configs.DEFAULT_BUTTON_ANIM
    };
  }
}

const UISetting = AnimMixin(BaseSetting);

const CharacterSelectionSetting = compose(TextBoxMixin, AnimMixin)(BaseSetting);

const GamePlaySetting = compose(GraphicMixin, TextBoxMixin, AnimMixin, BaseEventMixin)(BaseSetting);

export { BaseSetting, UISetting, CharacterSelectionSetting, GamePlaySetting };