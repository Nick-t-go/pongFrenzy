import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  FlatButton,
} from '../classes/ui/flatButton';

import {
  Controller,
} from '../classes/mc/controller';

import {
  MediaManager,
} from '../classes/util/mediaManager';

import {
  Constants,
} from '../constants';

import {
  Model, 
} from '../classes/mc/model';

import {
  ToggleButton
} from '../classes/ui/toggleButton';

class SimpleScene extends Phaser.Scene {

  constructor() {
    super('SceneMain');
  }

  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
    this.load.image('button1', 'assets/ui/buttons/2/1.png');
    this.load.image('button2', 'assets/ui/buttons/2/5.png');
    this.load.audio('cat', ['assets/audio/meow.mp3', 'assets/audio/meow.ogg']);
    this.load.audio('backgroundMusic', ['assets/audio/background.mp3', 'assets/audio/background.ogg']);
    this.load.image('toggleBack', 'assets/ui/toggles/1.png');
    this.load.image('sfxOff', 'assets/ui/icons/sfx_off.png');
    this.load.image('sfxOn', 'assets/ui/icons/sfx_on.png');
    this.load.image('musicOn', 'assets/ui/icons/music_on.png');
    this.load.image('musicOff', 'assets/ui/icons/music_off.png');
  }

  create() {
    this.add.text(100, 100, 'Hello Phaser!', {
      fill: '#0f0',
    });
    let cokeCan = this.add.image(0, 0, 'cokecan');
    const gridConfig = {
      rows: 5,
      cols: 5,
      scene: this,
    };

    this.emitter = new Phaser.Events.EventEmitter();
    this.G = new Constants();
    this.model = new Model(this.emitter, this.G);
    this.controller = new Controller(this.emitter, this.G, this.model);

    this.mediaManager = new MediaManager({
      scene: this,
      model: this.model,
    });
    this.mediaManager.setBackgroundMusic('backgroundMusic');

    const fireText = {
      color: 'red',
      fontSize: 20,
    };

    const alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    alignGrid.showNumbers();
    alignGrid.placeAtIndex(16, cokeCan);
    let flatButton = new FlatButton({
      scene: this,
      key: 'button1',
      text: 'Fire',
      event: 'button_pressed',
      emitter: this.emitter,
      params: 'fire_lasers',
      textConfig: fireText,
    });
    let flatButton2 = new FlatButton({
      scene: this,
      key: 'button2',
      text: 'Destruct!',
      event: 'button_pressed',
      emitter: this.emitter,
      params: 'self_destruct',
    });
    const sfxToggle = new ToggleButton({
      x: 240,
      y: 450,
      scene: this,
      backKey: 'toggleBack',
      onIcon: 'sfxOn',
      offIcon: 'sfxOff',
      value: true,
      width: ScreenConfig.width(),
      event: this.G.TOGGLE_SOUND,
      emitter: this.emitter,
    });
    const musicToggle = new ToggleButton({
      x: 240,
      y: 650,
      scene: this,
      backKey: 'toggleBack',
      onIcon: 'musicOn',
      offIcon: 'musicOff',
      value: true,
      width: ScreenConfig.width(),
      event: this.G.TOGGLE_MUSIC,
      emitter: this.emitter,
    });
    alignGrid.placeAtIndex(7, flatButton);
    alignGrid.placeAtIndex(12, flatButton2);
    alignGrid.placeAtIndex(17, sfxToggle);
    alignGrid.placeAtIndex(22, musicToggle);


    this.emitter.on('button_pressed', this.buttonPressed, this);
  }

  buttonPressed(params) {
    switch (params) {
      case 'self_destruct':
        this.model.musicOn = !this.model.musicOn;
        break;
      case 'fire_lasers':
        this.scene.start('SceneOver');
        break;
      default:
        this.emitter.emit(this.G.PLAY_SOUND, 'cat');
        break;
    }
  }
}

export {
  SimpleScene
};