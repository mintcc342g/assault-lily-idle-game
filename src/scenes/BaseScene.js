import Phaser from 'phaser';
import compose from 'lodash/fp/compose';
import * as configs from '../consts/configs.js';
import { CameraMixin, GraphicMixin, TextBoxMixin } from '../components/SceneMixin.js';

class BaseScene extends CameraMixin(Phaser.Scene) {
  constructor(name) {
    super(name);
    this.name = name;
    this.lang = configs.LANG_KR; // default language
    this.customAnim = {
      button: configs.DEFAULT_BUTTON_ANIM
    };
  }
}

const CharacterSelectionBaseScene = TextBoxMixin(BaseScene);

const GamePlayBaseScene = compose(GraphicMixin, TextBoxMixin)(BaseScene);

export { BaseScene, CharacterSelectionBaseScene, GamePlayBaseScene };