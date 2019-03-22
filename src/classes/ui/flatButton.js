class FlatButton extends Phaser.GameObjects.Container {
  constructor({
    text = 'Button Text',
    x = 0,
    y = 0,
    scene,
    key,
    event,
    emitter,
    params = 'Boop',
    textConfig = { color: 'white', fontSize: 20 },
  }) {

    if (!scene || !key) {
      const msg = !scene ? 'missing scene' : 'missing key';
      console.log(msg);
      super();
      return;
    }

    super(scene);

    this.scene = scene;
    this.back = this.scene.add.image(0, 0, key);
    this.add(this.back);
    this.text1 = this.scene.add.text(0, 0, text, textConfig);
    this.text1.setOrigin(0.5, 0.5);
    this.add(this.text1);
    this.x = x;
    this.y = y;

    if (event && emitter) {
      this.back.setInteractive();
      this.back.on('pointerdown', this.pressed, this);
      this.emitter = emitter;
      this.event = event;
      this.params = params;
    }


    this.scene.add.existing(this);
  }

  pressed() {
    this.emitter.emit(this.event, this.params);
  }

}

export {
  FlatButton,
}