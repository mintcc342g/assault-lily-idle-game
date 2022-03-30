import Phaser from 'phaser';
import compose from 'lodash/fp/compose';
import { AnimMixin } from './mixins/Animation.js';
import { BaseEventMixin } from './mixins/BaseEvent.js';
import { CameraMixin } from './mixins/Camera.js';
import { GraphicMixin } from './mixins/Graphic.js';
import { TextBoxMixin } from './mixins/TextBox.js';
import CharacterRepository from '../repository/characterRepo.js';
import DialogueRepository from '../repository/dialogueRepo.js';
import EventRepository from '../repository/eventRepo.js';
import TranslaterRepository from '../repository/translaterRepo.js';
import UserRepository from '../repository/userRepo.js';
import { LANG_KR } from '../consts/keys.js';

class BaseSetting extends CameraMixin(Phaser.Scene) {
  constructor(name) {
    super(name);
    this.name = name;
    this.charaRepo = new CharacterRepository();
    this.dialRepo = new DialogueRepository();
    this.transRepo = new TranslaterRepository();
    this.userRepo = new UserRepository();
    this.eventRepo = new EventRepository();
    this.lang = LANG_KR; // NOTE: default lang
  }
}

const UISetting = AnimMixin(BaseSetting);

const CharacterSelectionSetting = compose(TextBoxMixin, AnimMixin)(BaseSetting);

const GamePlaySetting = compose(GraphicMixin, TextBoxMixin, AnimMixin, BaseEventMixin)(BaseSetting);

export { BaseSetting, UISetting, CharacterSelectionSetting, GamePlaySetting };