import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  Align,
} from '../classes/util/align';
import {
  FlatButton,
} from '../classes/ui/flatButton';


class SceneTitle extends Phaser.Scene {
  constructor() {
    super('SceneTitle');
  }

  preload() {
    this.load.image('title', 'assets/title.png');
    this.load.image('button1', 'assets/ui/buttons/2/1.png');
  }

  create() {
    const gridConfig = {
      rows: 11,
      cols: 11,
      scene: this,
    };

    this.emitter = new Phaser.Events.EventEmitter();

    this.alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    const title = this.add.image(0, 0, 'title');
    const btnStart = new FlatButton({
      scene: this,
      key: 'button1',
      text: 'start',
      event: 'start_game',
      emitter: this.emitter,

    });

    Align.scaleToGameW(title, 0.8, ScreenConfig.width());
    this.alignGrid.placeAtIndex(38, title);
    this.alignGrid.placeAtIndex(93, btnStart);

    this.ball = this.physics.add.sprite(0, 0, 'balls');
    Align.scaleToGameW(this.ball, 0.05, ScreenConfig.width());
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(150, 200);
    this.ball.body.collideWorldBounds = true;

    this.emitter.on('start_game', this.startGame, this);
  }

  startGame() {
    this.scene.start('SceneMain');
  }
  // update() {

  // }
}

export {
  SceneTitle
}