// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import { ANIM_LEFT, ANIM_RIGHT, ANIM_TURN } from "./animations";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface PlayerPrefab {
  body: Phaser.Physics.Arcade.Body;
}

export default class PlayerPrefab extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    texture?: string,
    frame?: number | string
  ) {
    super(scene, x ?? 19, y ?? 25, texture || "dude", frame ?? 0);

    scene.physics.add.existing(this, false);
    this.body.bounce.x = 0.2;
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(32, 48, false);

    /* START-USER-CTR-CODE */
    this.scene.events.once("scene-awake", () => {
      this.awake();
    });
    /* END-USER-CTR-CODE */
  }

  public autoPlayAnimation: string = "turn";

  /* START-USER-CODE */

  awake() {
    this.play(this.autoPlayAnimation);
  }
  moveleft() {
    //left
    this.setVelocityX(-160);
    this.play(ANIM_LEFT, true);
  }
  moveright() {
    //right
    this.setVelocityX(160);
    this.play(ANIM_RIGHT, true);
  }
  stopMoving() {
    //stop moving
    this.setVelocityX(0);
    this.play(ANIM_TURN, true);
  }
  jump() {
    this.setVelocityY(-330);
  }

  die() {
    this.setTint(0xff0000);
    this.play(ANIM_TURN);
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
