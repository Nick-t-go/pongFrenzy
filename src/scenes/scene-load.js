import {
  ScreenConfig,
} from '../classes/util/screenConfig';

import {
  Bar,
} from '../classes/components/bar';

class SceneLoad extends Phaser.Scene {
  constructor() {
    super('SceneLoader');
  }

  preload() {
    this.bar = new Bar({
      scene: this,
      x: ScreenConfig.width() / 2,
      y: ScreenConfig.height() / 2,
    });

    this.progText = this.add.text(ScreenConfig.width() / 2, ScreenConfig.height() / 2, '0%', {
      color: '#ffffff',
      fontSize: ScreenConfig.width() / 20,
    });
    this.progText.setOrigin(0.5, 0.5);


    this.load.on('progress', this.onProgress, this);
    this.load.spritesheet('balls', 'assets/balls.png', {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet('paddles', 'assets/paddles.png', {
      frameWidth: 400,
      frameHeight: 50,
    });
    this.load.image('bar', 'assets/bar.jpg');

    this.load.audio('lose', ['assets/audio/lose.wav', 'assets/audio/lose.ogg']);
    this.load.audio('flip', ['assets/audio/flip.wav', 'assets/audio/flip.ogg']);
    this.load.audio('hit', ['assets/audio/hit.wav', 'assets/audio/hit.ogg']);
    this.load.image('toggleBack', 'assets/ui/toggles/3.png');
    this.load.image('sfxOff', 'assets/ui/icons/sfx_off.png');
    this.load.image('sfxOn', 'assets/ui/icons/sfx_on.png');
    this.load.image('musicOn', 'assets/ui/icons/music_on.png');
    this.load.image('musicOff', 'assets/ui/icons/music_off.png');
  }

  onProgress(value) {
    const per = Math.floor(value * 100);
    this.progText.setText(`${per}%`);
    this.bar.setPercent(value);
  }

  create() {
    this.scene.start('SceneTitle');
  }
}

export {
  SceneLoad,
}