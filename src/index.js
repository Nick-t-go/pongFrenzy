import 'phaser';
import { ScreenConfig } from './classes/util/screenConfig';

import { SimpleScene } from './scenes/simple-scene';
import { SceneOver } from './scenes/scene-over';
import { SceneTitle } from './scenes/scene-title';

const gameConfig = {
  width: ScreenConfig.width(),
  height: ScreenConfig.height(),
  scene: [SceneTitle, SimpleScene, SceneOver],
};

new Phaser.Game(gameConfig);
