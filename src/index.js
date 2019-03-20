import 'phaser';
import { ScreenConfig } from './util/screenConfig';

import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
  width: ScreenConfig.width(),
  height: ScreenConfig.height(),
  scene: SimpleScene,
};

new Phaser.Game(gameConfig);
