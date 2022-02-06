import Phaser from 'phaser';
import compose from 'lodash/fp/compose';
import * as configs from '../consts/configs.js';
import { AnimMixin } from './Animation.js';
import { CameraMixin } from './Camera.js';
import { GraphicMixin } from './Graphic.js';
import { TextBoxMixin } from './TextBox.js';
import { BaseEventMixin } from './events/BaseEvent.js';
import { RaimuEventMixin } from './events/RaimuEvent.js';
import { MaiEventMixin } from './events/MaiEvent.js';

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

const TheHillOfMariaSetting = compose(GraphicMixin, TextBoxMixin, AnimMixin, BaseEventMixin, RaimuEventMixin)(BaseSetting);

const YurigaokaGladeSetting = compose(GraphicMixin, TextBoxMixin, AnimMixin, BaseEventMixin, MaiEventMixin)(BaseSetting);

export { BaseSetting, UISetting, CharacterSelectionSetting, TheHillOfMariaSetting, YurigaokaGladeSetting };