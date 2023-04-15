// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class scorePrefab extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 51.5, y ?? 25.78515625, "", {});

    this.text = "score: 0";

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */

  private score: number = 0;

  addScore(points: number) {
    this.score += points;

    this.text = "Score: " + this.score;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
