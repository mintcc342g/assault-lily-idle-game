import Phaser from 'phaser';
import GridEngine from 'grid-engine';
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
    ],
  },
};
  
const game = new Phaser.Game(config);
  
ReactDOM.render(
  <App />,
  document.getElementById('root') || document.createElement('div')
);