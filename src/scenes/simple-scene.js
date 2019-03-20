import {
  ScreenConfig,
} from '../util/screenConfig';
import {
  AlignGrid,
} from '../util/alignGrid';

class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
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
  }
}

export {
  SimpleScene
};