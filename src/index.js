import Phaser from 'phaser';
import GridEngine from 'grid-engine';
import RexUIPlugins from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import RexInputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js'
import RexImageURILoaderPlugin from 'phaser3-rex-plugins/plugins/imageuriloader-plugin.js';
import RexFadePlugin from 'phaser3-rex-plugins/plugins/fade-plugin.js';
import RexButtonPlugin from 'phaser3-rex-plugins/plugins/button-plugin.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TheHillOfMariaScene from './scenes/TheHillOfMariaScene';

export const config = {
  type: Phaser.AUTO,
  title: 'Assault Lily Idle Game',
  parent: 'game-content',
  orientation: Phaser.Scale.LANDSCAPE,
  localStorageName: 'Assault Lily Idle Game',
  width: 630,
  hight: 810,
  autoRound: true,
  pixelArt: true,
  disableContextMenu: true,
  dom: {
    createContainer: true
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.NONE,
  },
  scene: [
    TheHillOfMariaScene,
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
      key: 'rexInputText',
      plugin: RexInputTextPlugin,
      start: true
      },
      {
        key: 'rexFade',
        plugin: RexFadePlugin,
        start: true
      },
      {
        key: 'rexButtonn',
        plugin: RexButtonPlugin,
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