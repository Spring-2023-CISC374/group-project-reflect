import Phaser from 'phaser'
import Gate from "../Objects/Gate";
import Switch from "../Objects/Switch";
import Button from '../Objects/Button';
import Player from '../Objects/Player';
import { CommonPreload } from './CommonPreload'; 

class nextSceneInit {
    private self: any = null
    constructor(_self: any) {
        this.self = _self
    }
    init() {
        this.self
    }
}

export default class LevelOne extends CommonPreload {
    constructor() {
        super('LevelOne')
    }


    create() {
        //Makes sky box
        this.add.image(400, 300, 'sky');
        new nextSceneInit(this)
        //Carries the text from one scene to another
        this.nextScene = this.add.text(775, 510, '->', { color: '#ffffff' });
        this.nextScene2 = this.add.text(775, 210, '->', { color: '#ffffff' });

        // Code Related to platforms and boxes

        // Sets scene physics (please move this)
        this.physics.add.group(this.nextScene)
        this.physics.add.group(this.nextScene2)

        this.nextScene.setVisible(false)
        this.nextScene2.setVisible(false)

        //Add static groups
        this.platforms = this.physics.add.staticGroup()
        this.boxes = this.physics.add.staticGroup()

        //Add Base Ground and Box
        const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
        ground.setScale(2)
        ground.refreshBody()
        const box = this.boxes.create(200, 525, "box") as Phaser.Physics.Arcade.Sprite
        box.setScale(0.05)
        box.refreshBody()

        //Add Higher Ground for the other sprite
        this.platforms.create(200, 280, "ground")
        this.platforms.create(400, 280, "ground")
        this.platforms.create(600, 280, "ground")

        //Add additional platforms
        this.platforms.create(700, 100, "ground")

        //Add additional boxes
        const box2 = this.boxes.create(400, 250, "box") as Phaser.Physics.Arcade.Sprite
        box2.setScale(0.05)
        box2.refreshBody()
        const box3 = this.boxes.create(430, 250, "box") as Phaser.Physics.Arcade.Sprite
        box3.setScale(0.05)
        box3.refreshBody()
        const box4 = this.boxes.create(430, 220, "box") as Phaser.Physics.Arcade.Sprite
        box4.setScale(0.05)
        box4.refreshBody()

        //Code related to the players
        this.player1 = this.physics.add.existing(new Player(this, 100, 430, "dude", 1))
        this.player2 = this.physics.add.existing(new Player(this, 100, 230, "dude", 2))
        this.player1.setCollideWorldBounds(true)
        this.physics.add.collider(this.player1, this.platforms)
        this.physics.add.collider(this.player1, this.boxes)
        this.player2.setBounce(0.1)
        this.player2.setCollideWorldBounds(true)
        this.physics.add.collider(this.player2, this.platforms)
        this.physics.add.collider(this.player2, this.boxes)




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



        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5, end: 8
            }),
            frameRate: 10,
            repeat: -1
        })
        //Allow for key presses
        this.cursors = this.input.keyboard?.createCursorKeys()

        //Code related to switches
        this.switchArray = []

        // array indexes (0, 1, 2) if true, open gate
        // by default all gates are true
        this.switchArray.push(new Switch(this, 700, 70, "switch", 1, 1)) //false, true, false
        this.switchArray.push(new Switch(this, 700, 70, "switch", 2, 1))
        this.switches = this.physics.add.group({
            key: "switch",
            immovable: true,
            allowGravity: false,
            setXY: { x: -480, y: 250 }
        })

        this.switchArray.forEach(object => {
            this.switches?.add(object);
        })

        this.physics.add.collider(this.switches, this.platforms)
        this.physics.add.overlap(this.player1, this.switches, this.handleHitSwitch, undefined, this)
        this.physics.add.overlap(this.player2, this.switches, this.handleHitSwitch, undefined, this)


        //Code Related to Gates

        this.gates = this.physics.add.group({
            key: "gate",
            immovable: true,
            allowGravity: false,
            setXY: { x: -480, y: 250 }
        })

        this.physics.add.collider(this.gates, this.platforms)
        this.physics.add.collider(this.gates, this.player1)
        this.physics.add.collider(this.gates, this.player2)

        // in this case, 0, 1, and 2 are telling the number of bools to turn false
        this.gateArray[0] = new Gate(this, -500, -250, "gate", 0);
        this.gateArray[0].setScale(2.5)
        this.gateArray[1] = new Gate(this, 700, 220, "gate", 2);
        this.gateArray[1].setScale(2.5)
        this.gateArray[2] = new Gate(this, 700, 480, "gate", 2);
        this.gateArray[2].setScale(2.5)

        this.gateArray.forEach(object => {
            this.gates?.add(object);
        })
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
        // for scene transition
        if (this.nextScene2) {
            this.tweens.add({
                targets: this.nextScene2,
                x: this.nextScene2.x + 10,
                duration: 500,
                ease: 'Sine.ease',
                yoyo: true,
                repeat: -1,
            });
        }

        this.physics.add.collider(this.nextScene, this.platforms)
        this.physics.add.overlap(this.nextScene, this.player1, this.handleLoadNextScene, undefined, this)
        this.physics.add.overlap(this.nextScene, this.player2, this.handleLoadNextScene, undefined, this)

        
        this.physics.add.collider(this.nextScene2, this.platforms)
        this.physics.add.overlap(this.nextScene2, this.player1, this.handleLoadNextScene, undefined, this)
        this.physics.add.overlap(this.nextScene2, this.player2, this.handleLoadNextScene, undefined, this)

        //Code related to buttons
        this.buttonArray = []
        this.buttonArray.push(new Button(this, 480, 250, "button", 1, 0))
        this.buttonArray.push(new Button(this, 300, 525, "button", 2, 0))
        this.buttons = this.physics.add.group({
            key: "button",
            immovable: true,
            allowGravity: false,
            setXY: { x: -480, y: 250 }
        })

        this.buttonArray.forEach(object => {
            this.buttons?.add(object);
        })

        this.physics.add.collider(this.buttons, this.platforms)
        this.physics.add.overlap(this.player1, this.buttons, this.handleHitButton, undefined, this)
        this.physics.add.overlap(this.player2, this.buttons, this.handleHitButton, undefined, this)


        //reset text top left
        this.resetText = this.add.text(10, 10, 'Reset', { fontFamily: 'Times New Roman', fontSize: '13', color: 'yellow' });
        //Menu top left
        this.menuText = this.add.text(50, 10, 'Menu', { fontFamily: 'Times New Roman', fontSize: '13', color: 'purple' });

        // reset touchable
        this.resetText.setInteractive();

        // monitor reset
        this.resetText.on('pointerdown', () => {
            this.scene.restart();
        });

        // reset touchable
        this.menuText.setInteractive();

        // monitor reset
        this.menuText.on('pointerdown', () => {
            this.scene.start('StartScreen');
        });

    }


    // sence transition
    private handleLoadNextScene() {
        if (this.gateArray.filter(object => object.body?.enable).length < 2) {
          this.nextScene?.setVisible(true)
          this.nextScene2?.setVisible(true)
        }
        if(this.nextScene?.visible && this.nextScene2?.visible) {
          this.scene.start('LevelThree')
        }
      }


    update() {
        super.update();
    }

}