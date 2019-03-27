class ScoreBox extends Phaser.GameObjects.Container {
  constructor({
    scene,
    fontSize = 12,
  }) {
    super(scene);
    this.scene = scene;
    this.text1 = this.scene.add.text(0, 0, 'SCORE: 0', {
      fontSize,
    });
    this.add(this.text1);
    this.text1.setOrigin(0.5, 0.5);

    this.scene.add.existing(this);
    this.scene.emitter.on(this.scene.G.SCORE_UPDATED, this.scoreUpdated, this);
  }

  scoreUpdated() {
    this.text1.setText(`Score: ${this.scene.model.score}`);
  }
}

export {
  ScoreBox
}