import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  FlatButton,
} from '../classes/ui/flatButton';

class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
    this.load.image('button1', 'assets/ui/buttons/1/1.png');
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
      text:"Press Me",
    });
    alignGrid.placeAtIndex(0, flatButton);
  }
}

export {
  SimpleScene
};