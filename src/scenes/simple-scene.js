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

class SimpleScene extends Phaser.Scene {

  constructor(){
    super('SceneMain')
  }

  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
    this.load.image('button1', 'assets/ui/buttons/2/1.png');
    this.load.image('button2', 'assets/ui/buttons/2/5.png');
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
    this.controller = new Controller(this.emitter, this.gameConstants, this.model);

    const fireText = { color: 'red', fontSize: 20 };

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
    this.emitter.on('button_pressed', this.buttonPressed, this);
    alignGrid.placeAtIndex(0, flatButton);
    alignGrid.placeAtIndex(6, flatButton2);

  }



  buttonPressed(params) {
    switch (params) {
      case 'self_destruct':
        console.log('Self Destruct!');
        break;
      case 'fire_lasers':
        console.log('Fire Lasers!');
        break;
      default:
        console.log('button pushed')
        break;
    }
  }

}

export {
  SimpleScene
};