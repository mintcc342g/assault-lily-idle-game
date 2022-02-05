import Phaser from 'phaser';
import compose from 'lodash/fp/compose';
import * as configs from '../consts/configs.js';
import * as mixin from '../components/SceneMixin.js';

class BaseScene extends mixin.CameraMixin(Phaser.Scene) {
  constructor(name) {
    super(name);
    this.name = name;
    this.lang = configs.LANG_KR; // default language
    this.customAnim = {
      button: configs.DEFAULT_BUTTON_ANIM
    };
  }
}

const UIBaseScene = mixin.AnimMixin(BaseScene);

const CharacterSelectionBaseScene = compose(mixin.TextBoxMixin, mixin.AnimMixin)(BaseScene);

const GamePlayBaseScene = compose(mixin.GraphicMixin, mixin.TextBoxMixin)(BaseScene);

export { BaseScene, CharacterSelectionBaseScene, GamePlayBaseScene, UIBaseScene };