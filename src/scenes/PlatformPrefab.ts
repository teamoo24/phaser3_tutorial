// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface PlatformPrefab {
  body: Phaser.Physics.Arcade.StaticBody;
}

export default class PlatformPrefab extends Phaser.Physics.Arcade.Image {
  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    texture?: string,
    frame?: number | string
  ) {
    super(scene, x ?? 30, y ?? 45, texture || "platform", frame);

    this.setOrigin(0, 0);
    this.tintFill = true;
    this.tintTopLeft = 15252743;
    this.tintTopRight = 15252743;
    this.tintBottomLeft = 625975;
    this.tintBottomRight = 625975;
    scene.physics.add.existing(this, true);
    this.body.setSize(400, 32, false);

    /* START-USER-CTR-CODE */
    this.scene.events.once("scene-awake", () => this.awake());
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */

  awake() {
    this.refreshBody();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
