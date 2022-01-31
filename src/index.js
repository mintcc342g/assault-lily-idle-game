import Phaser from 'phaser';
import GridEngine from 'grid-engine';
import RexUIPlugins from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import RexTextEditPlugin from 'phaser3-rex-plugins/plugins/textedit-plugin.js'
import RexImageURILoaderPlugin from 'phaser3-rex-plugins/plugins/imageuriloader-plugin.js';
import RexGlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilter2pipeline-plugin.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BootScene from './scenes/BootScene';
import MainScene from './scenes/MainScene';
import CharacterSelectionScene from './scenes/CharacterSelectionScene';
import UIScene from './scenes/UIScene';
import TheHillOfMariaScene from './scenes/TheHillOfMariaScene';

export const config = {
  type: Phaser.AUTO,
  title: 'Assault Lily Idle Game',
  parent: 'game-content',
  width: 630,
  height: 810,
  autoRound: true,
  pixelArt: true,
  disableContextMenu: true,
  backgroundColor: '#222',
  dom: {
    createContainer: true
  },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  scene: [
    BootScene,
    MainScene,
    CharacterSelectionScene,
    TheHillOfMariaScene,
    UIScene, // UIScene have to be set in the last of the scene array
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  plugins: {
    scene: [
      {
        key: 'gridEngine',
        plugin: GridEngine,
        mapping: 'gridEngine',
      },
      {
        key: 'rexUI',
        plugin: RexUIPlugins,
        mapping: 'rexUI'
      },
    ],
    global: [
      {
        key: 'rexImageURILoader',
        plugin: RexImageURILoaderPlugin,
        start: true
      },
      {
        key: 'rexTextEdit',
        plugin: RexTextEditPlugin,
        start: true
      },
      {
        key: 'rexGlowFilterPipeline',
        plugin: RexGlowFilterPipelinePlugin,
        start: true
      },
    ]
  },
};
  
const game = new Phaser.Game(config);
  
ReactDOM.render(
  <App />,
  document.getElementById('root') || document.createElement('div')
);