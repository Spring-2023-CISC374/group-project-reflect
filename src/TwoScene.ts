import Phaser from 'phaser'

export default class TwoScene extends Phaser.Scene {
    //private switches?: Phaser.Physics.Arcade.Group;
    //private switchesA?: Phaser.Physics.Arcade.Group;
    //private buttons?: Phaser.Physics.Arcade.Group;
    //private buttonsA?: Phaser.Physics.Arcade.Group;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private nextScene?: Phaser.GameObjects.Text;

    constructor() {
        super('TwoScene')
    }

    preload() {
        //this.load.setBaseURL('https://labs.phaser.io')

        this.load.image('sky', 'assets/sky.png')
        this.load.image("switch", "assets/star.png");
        this.load.image("switchA", "assets/bomb.png");
        this.load.image("button", "assets/button.png");
        this.load.image("buttonA", "assets/buttonA.png");
        this.load.image("ground", "assets/platform.png");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32, frameHeight: 48
        });


    }

    create() {
        //Makes sky box
        this.add.image(400, 300, 'sky');
        // add next text
        this.nextScene = this.add.text(775, 510, '->', { color: '#ffffff' });
        // Code Related to platforms
        this.platforms = this.physics.add.staticGroup()
        const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
        ground.setScale(2)
        ground.refreshBody()
        //Add Platform(s)

        //this.platforms.create(600,400,"ground")

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

        this.physics.add.group(this.nextScene)

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5, end: 8
            }),
            frameRate: 10,
            repeat: -1
        })


        this.cursors = this.input.keyboard.createCursorKeys()

        // loop tween anim
        if (this.nextScene) {
            this.tweens.add({
                targets: this.nextScene,
                x: this.nextScene.x + 10,
                duration: 500,
                ease: 'Sine.ease',
                yoyo: true,
                repeat: -1,
            });
        }
        this.physics.add.collider(this.nextScene, this.platforms)
        this.physics.add.overlap(this.nextScene, this.player, this.handleLoadNextScene, undefined, this)


    }

    // scene
    private handleLoadNextScene(player: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
        this.scene.start('ThreeScene')
    }
    //ThreeScene
    //private handleLoadNextScene(player: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
    //this.scene.start('ThreeScene')
    //}


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
