import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  Align,
} from '../classes/util/align';
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
  SoundButtons,
} from '../classes/ui/soundButtons';

import {
  ScoreBox,
} from '../classes/components/scoreBox';


class SimpleScene extends Phaser.Scene {

  constructor() {
    super('SceneMain');
  }

  create() {
    this.emitter = new Phaser.Events.EventEmitter();
    this.G = new Constants();
    this.model = new Model(this.emitter, this.G);
    this.controller = new Controller(this.emitter, this.G, this.model);
    this.mediaManager = new MediaManager({
      scene: this,
      model: this.model,
    });
    this.sb = new SoundButtons(this, ScreenConfig.width());
    const gridConfig = {
      rows: 5,
      cols: 5,
      scene: this,
    };
    const alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    this.velocity = 100;
    this.centerY = ScreenConfig.height() / 2;
    this.pMove = ScreenConfig.height() / 32;
    this.tenth = ScreenConfig.height() / 10;

    this.bar = this.add.image(0, 0, 'bar');
    Align.scaleToGameW(this.bar, 0.3, ScreenConfig.width());
    this.bar.displayHeight = ScreenConfig.height();

    this.ball = this.physics.add.sprite(0, 0, 'balls');
    Align.scaleToGameW(this.ball, 0.05, ScreenConfig.width());

    this.paddle1 = this.physics.add.sprite(200, 200, 'paddles');
    Align.scaleToGameW(this.paddle1, 0.25, ScreenConfig.width());
    this.paddle2 = this.physics.add.sprite(20, 20, 'paddles');
    Align.scaleToGameW(this.paddle2, 0.25, ScreenConfig.width());
    this.pScale = this.paddle1.scaleX;
    this.scoreBox = new ScoreBox({
      scene: this,
      fontSize: ScreenConfig.width() / 30,
    });

    this.sb.musicToggle.visible = false;
    alignGrid.placeAtIndex(4, this.sb.sfxToggle);
    alignGrid.placeAtIndex(12, this.ball);
    alignGrid.placeAtIndex(12, this.bar);
    alignGrid.placeAtIndex(22, this.paddle1);
    alignGrid.placeAtIndex(2, this.paddle2);
    alignGrid.placeAtIndex(10, this.scoreBox);

    this.ball.setVelocity(0, this.velocity);
    this.setBallColor();
    this.paddle1.setImmovable();
    this.paddle2.setImmovable();

    this.physics.add.collider(this.ball, this.paddle1, this.ballHit, null, this);
    this.physics.add.collider(this.ball, this.paddle2, this.ballHit, null, this);
    this.input.on('pointerdown', this.changePaddle, this);
    this.input.on('pointerup', this.onUp, this);
  }

  onUp(pointer) {
    const diffY = Math.abs(pointer.y - this.downY);
    if (diffY > 200) {
      this.tweens.add({
        targets: this.paddle2,
        duration: 500,
        y: this.tenth,
      });
      this.tweens.add({
        targets: this.paddle1,
        duration: 500,
        y: this.tenth * 9,
      });
    }
  }

  setBallColor() {
    const r = Math.floor(Math.random() * 100);
    if (r < 50) {
      this.ball.setFrame(0);
    } else {
      this.ball.setFrame(1);
    }
  }

  changePaddle(pointer) {
    const paddle = this.velocity > 0 ? this.paddle1 : this.paddle2;
    this.tweens.add({
      targets: paddle,
      duration: 500,
      scaleX: 0,
      onComplete: this.onCompleteHandler,
      onCompleteParams: [{
        scope: this,
        paddle: paddle
      }],
    });
    this.downY = pointer.y;
    this.emitter.emit(this.G.PLAY_SOUND, 'flip');
  }

  onCompleteHandler(tween, targets, params) {
    params.paddle.scaleX = params.scope.pScale;
    const color = params.paddle.frame.name === 1 ? 0 : 1;
    params.paddle.setFrame(color);
  }

  doOver() {
    this.scene.start('SceneOver');
  }

  addPoints(distY) {
    let points = 1;
    if (distY < ScreenConfig.height() / 3) {
      points = 2;
    }
    if (distY < ScreenConfig.height() / 4) {
      points = 3;
    }
    this.emitter.emit(this.G.UP_POINTS, points);
  }

  ballHit(ball, paddle) {
    this.velocity = -this.velocity;
    this.velocity += this.velocity * 0.02;
    const distY = this.paddle1.y - this.paddle2.y;
    if (ball.frame.name === paddle.frame.name) {
      this.addPoints(distY);
      this.emitter.emit(this.G.PLAY_SOUND, 'hit');
    } else {
      this.emitter.emit(this.G.PLAY_SOUND, 'lose');
      this.time.addEvent({
        delay: 1000,
        callback: this.doOver,
        callbackScope: this,
        loop: false,
      });
      return;
    }
    ball.setVelocity(0, this.velocity);
    this.setBallColor();
    let targetY = paddle.y;
    if (paddle.y > this.centerY && distY > ScreenConfig.height() / 5) {
      targetY -= this.pMove;
    } else if (distY > ScreenConfig.height() / 5) {
      targetY += this.pMove;
    }
    this.tweens.add({
      targets: paddle,
      duration: 1000,
      y: targetY,
    });
  }
}

export {
  SimpleScene
};