// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PlatformPrefab from "./PlatformPrefab";
import PlayerPrefab from "./PlayerPrefab";
import StarPrefab from "./StarPrefab";
import scorePrefab from "./scorePrefab";
/* START-USER-IMPORTS */
import BombPrefab from "./BombPrefab";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // leftKey
    const leftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );

    // rightKey
    const rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    // upKey
    const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    // sky
    this.add.image(400, 300, "sky");

    // platformLayer
    const platformLayer = this.add.layer();

    // platform
    const platform = new PlatformPrefab(this, 600, 400);
    platform.setOrigin(0.5, 0.5);
    platformLayer.add(platform);

    // platform_1
    const platform_1 = new PlatformPrefab(this, 50, 250);
    platform_1.setOrigin(0.5, 0.5);
    platformLayer.add(platform_1);

    // platform_2
    const platform_2 = new PlatformPrefab(this, 750, 220);
    platform_2.setOrigin(0.5, 0.5);
    platformLayer.add(platform_2);

    // bottomPlatgorm
    const bottomPlatgorm = new PlatformPrefab(this, 400, 568);
    bottomPlatgorm.scaleX = 2;
    bottomPlatgorm.scaleY = 2;
    bottomPlatgorm.setOrigin(0.5, 0.5);
    bottomPlatgorm.tintBottomLeft = 670736;
    bottomPlatgorm.tintBottomRight = 670736;
    platformLayer.add(bottomPlatgorm);

    // player
    const player = new PlayerPrefab(this, 100, 450);
    this.add.existing(player);

    // starsLayer
    const starsLayer = this.add.layer();

    // star
    const star = new StarPrefab(this, 49, -15);
    starsLayer.add(star);

    // star_1
    const star_1 = new StarPrefab(this, 739, -15);
    starsLayer.add(star_1);

    // star_2
    const star_2 = new StarPrefab(this, 670, -15);
    starsLayer.add(star_2);

    // star_3
    const star_3 = new StarPrefab(this, 325, -15);
    starsLayer.add(star_3);

    // star_4
    const star_4 = new StarPrefab(this, 601, -15);
    starsLayer.add(star_4);

    // star_5
    const star_5 = new StarPrefab(this, 532, -15);
    starsLayer.add(star_5);

    // star_6
    const star_6 = new StarPrefab(this, 463, -15);
    starsLayer.add(star_6);

    // star_7
    const star_7 = new StarPrefab(this, 394, -15);
    starsLayer.add(star_7);

    // star_8
    const star_8 = new StarPrefab(this, 256, -15);
    starsLayer.add(star_8);

    // star_9
    const star_9 = new StarPrefab(this, 187, -15);
    starsLayer.add(star_9);

    // star_10
    const star_10 = new StarPrefab(this, 118, -15);
    starsLayer.add(star_10);

    // bombsLayer
    const bombsLayer = this.add.layer();

    // scoreText
    const scoreText = new scorePrefab(this, 16, 16);
    this.add.existing(scoreText);

    // lists
    const platforms = [platform, platform_2, platform_1, bottomPlatgorm];

    // player_platforms_collider
    this.physics.add.collider(player, platformLayer.list);

    // stars_platforms_collider
    this.physics.add.collider(starsLayer.list, platformLayer.list);

    // player_stars_collider
    this.physics.add.overlap(
      player,
      starsLayer.list,
      this.collectStar as any,
      undefined,
      this
    );

    // bombs_platforms_collider
    this.physics.add.collider(bombsLayer.list, platformLayer.list);

    // collider
    this.physics.add.collider(
      player,
      bombsLayer.list,
      this.hitBomb as any,
      undefined,
      this
    );

    // player (prefab fields)
    player.autoPlayAnimation = "left";

    this.player = player;
    this.starsLayer = starsLayer;
    this.bombsLayer = bombsLayer;
    this.scoreText = scoreText;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.upKey = upKey;
    this.platforms = platforms;

    this.events.emit("scene-awake");
  }

  private player!: PlayerPrefab;
  private starsLayer!: Phaser.GameObjects.Layer;
  private bombsLayer!: Phaser.GameObjects.Layer;
  private scoreText!: scorePrefab;
  private leftKey!: Phaser.Input.Keyboard.Key;
  private rightKey!: Phaser.Input.Keyboard.Key;
  private upKey!: Phaser.Input.Keyboard.Key;
  private platforms!: PlatformPrefab[];

  /* START-USER-CODE */

  // Write your code here

  private gameOver = false;

  create() {
    this.editorCreate();
  }

  private collectStar(player: PlayerPrefab, star: StarPrefab) {
    star.collected();
    this.scoreText.addScore(10);

    // spawn the star agiain
    if (this.noStarActive()) {
      for (const obj of this.starsLayer.list) {
        const star = obj as StarPrefab;

        star.resetStar();
      }

      //spawn a bomb
      var bombX =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const bomb = new BombPrefab(this, bombX, 0);
      this.bombsLayer.add(bomb);
    }
  }

  private noStarActive() {
    for (const star of this.starsLayer.list) {
      if (star.active) {
        return false;
      }
    }
    return true;
  }

  private hitBomb(player: PlayerPrefab, Bomb: BombPrefab) {
    this.physics.pause();
    player.die();

    this.gameOver = true;
  }
  //
  update() {
    if (this.gameOver) {
      return;
    }
    this.updatePlayer();
  }

  private updatePlayer() {
    if (this.leftKey.isDown) {
      this.player.moveleft();
    } else if (this.rightKey.isDown) {
      this.player.moveright();
    } else {
      this.player.stopMoving();
    }

    if (this.upKey.isDown && this.player.body.touching.down) {
      this.player.jump();
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
