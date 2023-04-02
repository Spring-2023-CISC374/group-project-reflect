import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
    //Sprite creation
    private switches?: Phaser.Physics.Arcade.Group;
    private switchesA?: Phaser.Physics.Arcade.Group;
    private buttons?: Phaser.Physics.Arcade.Group;
    private buttonsA?: Phaser.Physics.Arcade.Group;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
	//Scene Transition
    private nextScene?: Phaser.GameObjects.Text;

    constructor() {
        super('hello-world')
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
        //Carries the text from one scene to another
        this.nextScene = this.add.text(775, 510, '->', { color: '#ffffff' });

        // Code Related to platforms

        //Add Base Ground
        this.platforms = this.physics.add.staticGroup()
        const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
        ground.setScale(2)
        ground.refreshBody()


        //Add Higher Ground for the other sprite
        this.platforms.create(400, 280,"ground")
        this.platforms.create(200, 280,"ground")
        this.platforms.create(600, 280,"ground")

        //Add additional platforms
        this.platforms.create(300, 530, "ground")

        //Code related to the player
        this.player = this.physics.add.sprite(100, 430, "dude")
        this.player.setBounce(0.1)
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


        //Allow for key presses
        this.cursors = this.input.keyboard.createCursorKeys()

        //Code related to switches
        this.switches = this.physics.add.group({
            key: "switch",
            setXY: { x: 400, y: 500 }
        })
        this.physics.add.collider(this.switches, this.platforms)
        this.physics.add.overlap(this.player, this.switches, this.handleHitSwitch, undefined, this)

        this.switchesA = this.physics.add.group({
            key: "switchA",
            setXY: { x: 400, y: 500 }
        })
        this.physics.add.collider(this.switchesA, this.platforms)

        this.physics.add.overlap(this.switchesA, this.switches, this.handleSwitchSetup, undefined, this)
        this.physics.add.overlap(this.switchesA, this.player, this.handleHitSwitchA, undefined, this)
        
        // Here you can make new switches without having to call anything else - BN
        //this.switches.create(400, 510,"switch")
        //this.switchesA.create(400, 510,"switchA")
        //

        // for scene transition
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

        //Code related to buttons
        this.buttons = this.physics.add.group({
            key: "button",
            setXY: { x: 480, y: 250 }
        })
        this.physics.add.collider(this.buttons, this.platforms)
        this.physics.add.overlap(this.player, this.buttons, this.handleHitButton, undefined, this)

        this.buttonsA = this.physics.add.group({
            key: "buttonA",
            setXY: { x: 480, y: 250 }
        })
        this.physics.add.collider(this.buttonsA, this.platforms)

        this.physics.add.overlap(this.buttonsA, this.buttons, this.handleButtonSetup, undefined, this)
        this.physics.add.overlap(this.buttonsA, this.player, this.handleHitButtonA, undefined, this)

        // Here you can make new buttons without having to call anything else - BN
        this.buttons.create(300, 500,"button")
        this.buttonsA.create(300, 500,"buttonA")
        //

    }

    //Handle buttons
    private handleHitButton(player: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {

    }

    private handleButtonSetup(bA: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {
        const the_button = bA as Phaser.Physics.Arcade.Image
        the_button.visible = false
    }

    private handleHitButtonA(player: Phaser.GameObjects.GameObject, bA: Phaser.GameObjects.GameObject) {
        const the_button = bA as Phaser.Physics.Arcade.Image
        the_button.visible = true
    }

    //Handle switches
    private handleSwitchSetup(sA: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
        const the_switch = sA as Phaser.Physics.Arcade.Image
        the_switch.visible = false
    }

    private handleHitSwitch(player: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
        const the_switch = s as Phaser.Physics.Arcade.Image
        the_switch.disableBody(true, true)
    }

    private handleHitSwitchA(player: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
        const the_switch = sA as Phaser.Physics.Arcade.Image
        the_switch.visible = true
    }

	// sence transition
    private handleLoadNextScene(player: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
        this.scene.start('TwoScene')
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
        }
        else if(this.cursors?.down.isDown){
            this.player?.setVelocityY(400);
            this.player?.anims.play('turn', true)
        }
        else {
            this.player?.setVelocityX(0)
            this.player?.anims.play("turn")
        }

        if (this.cursors.up?.isDown && this.player?.body.touching.down) {
            this.player.setVelocityY(-330)
        }

    }

}
