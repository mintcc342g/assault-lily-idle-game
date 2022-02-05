import Phaser from 'phaser';
import compose from 'lodash/fp/compose';
import { CameraMixin, GraphicMixin, TextBoxMixin } from '../components/SceneMixin.js';

export const BaseScene = CameraMixin(Phaser.Scene);

export const CharacterSelectionBaseScene = TextBoxMixin(BaseScene);

export const GamePlayBaseScene = compose(GraphicMixin, TextBoxMixin)(BaseScene);