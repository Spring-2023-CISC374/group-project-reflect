import Phaser from 'phaser'
import Gate from "./Objects/Gate";
import Switch from "./Objects/Switch";
import Button from './Objects/Button';

export default class HelloWorldScene extends Phaser.Scene {
    //Sprite creation
    private switches?: Phaser.Physics.Arcade.Group;
    private switchArray: Switch[] = [];
    private switchesA?: Phaser.Physics.Arcade.Group;
    private buttons?: Phaser.Physics.Arcade.Group;
    private buttonArray: Button[] = [];
    private buttonsA?: Phaser.Physics.Arcade.Group;
    private gates?: Phaser.Physics.Arcade.Group;
    private gateArray: Gate[] = [];
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player1?: Phaser.Physics.Arcade.Sprite;
    private player2?: Phaser.Physics.Arcade.Sprite;
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
        this.load.image("gate", "assets/BowlingBall.png");
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

        //Code related to the players
        this.player1 = this.physics.add.sprite(100, 430, "dude")
        this.player1.setBounce(0.1)
        this.player1.setCollideWorldBounds(true)
        this.physics.add.collider(this.player1, this.platforms)

        this.player2 = this.physics.add.sprite(100, 230, "dude")
        this.player2.setBounce(0.1)
        this.player2.setCollideWorldBounds(true)
        this.physics.add.collider(this.player2, this.platforms)

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
        this.switchArray = []
       this.switchArray.push(new Switch(this, 400, 500, "assets/star.png", 0, 0))
        this.switches = this.physics.add.group({
            key: "switch",
            setXY: { x: -480, y: 250 }

        })

        
        this.switchArray.forEach(object => {
            this.switches?.add(object);
        })
        
      //  this.switches.add(switch0)
        this.physics.add.collider(this.switches, this.platforms)
        this.physics.add.overlap(this.player1, this.switches, this.handleHitSwitch1, undefined, this)
        this.physics.add.overlap(this.player2, this.switches, this.handleHitSwitch2, undefined, this)

        this.switchesA = this.physics.add.group({
            key: "switchA",
            setXY: { x: 400, y: 500 }
        })
        this.physics.add.collider(this.switchesA, this.platforms)

        this.physics.add.overlap(this.switchesA, this.switches, this.handleSwitchSetup, undefined, this)
        this.physics.add.overlap(this.switchesA, this.player1, this.handleHitSwitchA1, undefined, this)
        this.physics.add.overlap(this.switchesA, this.player2, this.handleHitSwitchA2, undefined, this)
        
        // Here you can make new switches without having to call anything else - BN
        //this.switches.create(400, 510,"switch")
        //this.switchesA.create(400, 510,"switchA")
        //

        //Code Related to Gates
        
        this.gates = this.physics.add.group({
            key: "gate",
            immovable: true,
            allowGravity: false,
            setXY: { x: -480, y: 250 }
        })
       // this.gates.create(200, 0,"gate")
        this.physics.add.collider(this.gates, this.platforms)
        this.physics.add.collider(this.gates, this.player1)
        this.physics.add.collider(this.gates, this.player2)

        this.gateArray[0] = new Gate(this, 0, 250, "assets/BowlingBall.png", 0);
        this.gateArray[1] = new Gate(this, 200, 200, "assets/BowlingBall.png", 1);
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
        this.physics.add.overlap(this.nextScene, this.player1, this.handleLoadNextScene, undefined, this)
        this.physics.add.overlap(this.nextScene, this.player2, this.handleLoadNextScene, undefined, this)

        //Code related to buttons
        this.buttonArray = []
       this.buttonArray.push(new Button(this, 480, 250, "assets/star.png", 0, 0))
       this.buttonArray.push(new Button(this, 300, 500, "assets/star.png", 0, 0))
        this.buttons = this.physics.add.group({
            key: "button",
            setXY: { x: -480, y: 250 }
        })

        this.buttonArray.forEach(object => {
            this.buttons?.add(object);
        })

        this.physics.add.collider(this.buttons, this.platforms)
        this.physics.add.overlap(this.player1, this.buttons, this.handleHitButton, undefined, this)
        this.physics.add.overlap(this.player2, this.buttons, this.handleHitButton, undefined, this)

        this.buttonsA = this.physics.add.group({
            key: "buttonA",
            setXY: { x: 480, y: 250 }
        })
        this.physics.add.collider(this.buttonsA, this.platforms)

        this.physics.add.overlap(this.buttonsA, this.buttons, this.handleButtonSetup, undefined, this)
        this.physics.add.overlap(this.buttonsA, this.player1, this.handleHitButton1, undefined, this)
        this.physics.add.overlap(this.buttonsA, this.player2, this.handleHitButton2, undefined, this)


        // Here you can make new buttons without having to call anything else - BN
        
        this.buttonsA.create(300, 500,"buttonA")
        //

    }

    //Handle buttons
    private handleHitButton(player1: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {

    }

    private handleButtonSetup(bA: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {
        const the_button = bA as Phaser.Physics.Arcade.Image
        the_button.visible = false
    }

    private handleHitButton1(player1: Phaser.GameObjects.GameObject, bA: Phaser.GameObjects.GameObject) {
        const the_button = bA as Phaser.Physics.Arcade.Image
        the_button.visible = true
    }

    private handleHitButton2(player2: Phaser.GameObjects.GameObject, bA: Phaser.GameObjects.GameObject) {
        const the_button = bA as Phaser.Physics.Arcade.Image
        the_button.visible = true
    }

    //Handle switches
    private handleSwitchSetup(sA: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
        const the_switch = sA as Phaser.Physics.Arcade.Image
        the_switch.visible = false
    }

    private handleHitSwitch1(player1: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
        const the_switch = s as Switch
        the_switch.gateID = 0;
        the_switch.switchID = 0;
        //this.gateArray[the_switch.gateID].setVisible(false)
        the_switch.disableBody(true, true)
        this.gateArray[the_switch.gateID].actives[the_switch.switchID] = true;
        this.gateArray[the_switch.gateID].handleActivate;
        //this.gateArray[the_switch.gateID].setVisible(false)
    }

    private handleHitSwitch2(player2: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
        const the_switch = s as Switch
        the_switch.disableBody(true, true)
        this.gateArray[the_switch.gateID].actives[the_switch.switchID] = true;
        this.gateArray[the_switch.gateID].handleActivate;
    }

    private handleHitSwitchA1(player1: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
        const the_switch = sA as Phaser.Physics.Arcade.Image
        the_switch.visible = true
    }

    private handleHitSwitchA2(player2: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
        const the_switch = sA as Phaser.Physics.Arcade.Image
        the_switch.visible = true
    }

	// sence transition
    private handleLoadNextScene(player: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
        this.scene.start('TwoScene')
    }
	//ThreeScene
	//private handleLoadNextScene(player1: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
        //this.scene.start('ThreeScene')
    //}


    update() {
        if (!this.cursors) {
            return
        }

        if (this.cursors?.left.isDown) {
            this.player1?.setVelocityX(-160)
            this.player1?.anims.play("left", true)
            this.player2?.setVelocityX(-160)
            this.player2?.anims.play("left", true)
        } else if (this.cursors?.right.isDown) {
            this.player1?.setVelocityX(160)
            this.player1?.anims.play("right", true)
            this.player2?.setVelocityX(160)
            this.player2?.anims.play("right", true)
        }
        else if(this.cursors?.down.isDown){
            this.player1?.setVelocityY(400);
            this.player1?.anims.play('turn', true)
            this.player2?.setVelocityY(400);
            this.player2?.anims.play('turn', true)
        }
        else {
            this.player1?.setVelocityX(0)
            this.player1?.anims.play("turn")
            this.player2?.setVelocityX(0)
            this.player2?.anims.play("turn")
        }

        if (this.cursors.up?.isDown && this.player1?.body.touching.down) {
            this.player1.setVelocityY(-330)
        }

        if (this.cursors.up?.isDown && this.player2?.body.touching.down) {
            this.player2.setVelocityY(-330)
        }

    }

}
