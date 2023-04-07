import Phaser from 'phaser'

export default class TwoScene extends Phaser.Scene {
    private stars: Phaser.Physics.Arcade.Group | undefined;
    private score: number = 0;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private scoreText: Phaser.GameObjects.Text | undefined;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private resetText: Phaser.GameObjects.Text | undefined;

    constructor() {
        super('FourScene')
    }

    preload() {
        this.load.image('sky', 'assets/sky.png')
        this.load.image("switch", "assets/star.png");
        this.load.image("switchA", "assets/bomb.png");
        this.load.image("ground", "assets/platform.png");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32, frameHeight: 48
        });
    }

    create() {
        //Makes sky box
        this.add.image(400, 300, 'sky');
        this.stars = this.physics.add.group();

        // score
        this.scoreText = this.add.text(60, 10, 'Score: 0', { fontFamily: 'Arial', fontSize: '32', color: '#ffffff' });

        // Reset
        this.resetText = this.add.text(10, 10, 'Reset', { fontFamily: 'Arial', fontSize: '32', color: '#ffffff' });

        // Code Related to platforms
        this.platforms = this.physics.add.staticGroup()
        const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
        ground.setScale(2)
        ground.refreshBody()

        //Code related to the player
        this.player = this.physics.add.sprite(100, 430, "dude")
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platforms)

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0, end: 3
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20
        })

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5, end: 8
            }),
            frameRate: 10,
            repeat: -1
        })

        this.cursors = this.input.keyboard.createCursorKeys()

        // timer for star
        this.time.addEvent({
            delay: 1000, // 1sec
            loop: true, // infinte loop
            callback: this.createStar, // Callback functions
            callbackScope: this, // Callback functions
        });

        // collider
        if (this.stars) {
            // this.physics.add.collider(this.stars, this.stars, this.onBubbleHit, null, this);
            // @ts-ignore
            this.physics.add.overlap(this.stars, this.player, this.onPlayerGetStart, undefined, this);
        }
        // Interactive
        this.resetText.setInteractive();
        // restart
        this.resetText.on('pointerdown', (pointer) => {
          this.scene.restart();
        });
    }

    private createStar() {
        // Randomly generate the position and size of stars
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        const size = Phaser.Math.Between(20, 80);

        // new star
        const star = this.physics.add.sprite(x, y, 'switch');
        star.setScale(size / 100);
        star.setInteractive();
        if (this.stars) {
            this.stars.add(star);
        }
    }


    private onPlayerGetStart(stars?: Phaser.Physics.Arcade.Group, player?: Phaser.Physics.Arcade.Sprite) {
        // player.destroy()
        if (player && player.active && player.visible) {
            player.destroy();
            this.score += 10;
            if (this.scoreText) {
                this.scoreText.setText('Score: ' + this.score);
            }
        }
    }

    update() {
        if (!this.cursors) {
            return
        }

        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-160)
            this.player?.anims.play("left", true)
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(160)
            this.player?.anims.play("right", true)
        } else {
            this.player?.setVelocityX(0)
            this.player?.anims.play("turn")
        }

        if (this.cursors.up?.isDown && this.player?.body.touching.down) {
            this.player.setVelocityY(-330)
        }

    }
}
