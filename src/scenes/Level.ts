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

		// platform
		const platform = new PlatformPrefab(this, -30, 186);
		this.add.existing(platform);

		// platform_1
		const platform_1 = new PlatformPrefab(this, 505, 283);
		this.add.existing(platform_1);

		// platform_2
		const platform_2 = new PlatformPrefab(this, 515, 110);
		this.add.existing(platform_2);

		// platformPrefab
		const platformPrefab = new PlatformPrefab(this, 0, 536);
		this.add.existing(platformPrefab);
		platformPrefab.scaleX = 2;
		platformPrefab.scaleY = 2;
		platformPrefab.tintBottomLeft = 670736;
		platformPrefab.tintBottomRight = 670736;

		// player
		const player = new PlayerPrefab(this, 333, 75);
		this.add.existing(player);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 440, 175);
		this.add.existing(playerPrefab);

		// player (prefab fields)
		player.autoPlayAnimation = "left";

		// playerPrefab (prefab fields)
		playerPrefab.autoPlayAnimation = "right";

		this.player = player;

		this.events.emit("scene-awake");
	}

	private player!: PlayerPrefab;

	/* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
