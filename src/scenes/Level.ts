// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PlatformPrefab from "./PlatformPrefab";
import PlayerPrefab from "./PlayerPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

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

		// lists
		const platforms = [platform, platform_2, platform_1, bottomPlatgorm];

		// collider
		this.physics.add.collider(player, platformLayer.list);

		// player (prefab fields)
		player.autoPlayAnimation = "left";

		this.player = player;
		this.platforms = platforms;

		this.events.emit("scene-awake");
	}

	private player!: PlayerPrefab;
	private platforms!: PlatformPrefab[];

	/* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
