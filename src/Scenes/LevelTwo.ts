import Phaser from 'phaser'
import Gate from "../Objects/Gate";
import Switch from "../Objects/Switch";
import Player from '../Objects/Player';
import {CommonPreload} from './CommonPreload';


export default class LevelTwo extends CommonPreload {
    constructor() {
        super('LevelTwo')
    }


    create() {
        //Makes sky box
        this.add.image(400, 300, 'sky');
        //Carries the text from one scene to another
        this.nextScene = this.add.text(775, 510, '->', { color: '#ffffff' });

        // Code Related to platforms and boxes

        
        //Add static groups
        this.platforms = this.physics.add.staticGroup()
        this.boxes = this.physics.add.staticGroup()

        //Add Base Ground and Box
        const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
        ground.setScale(2)
        ground.refreshBody()

        //Add Higher Ground for the other sprite
        this.platforms.create(200, 280,"ground")
        this.platforms.create(400, 280,"ground")

        //Add additional platforms
        const smaller = this.platforms.create(400, 180, "ground")
        smaller.setScale(0.5)
        smaller.refreshBody()
        const smaller2 = this.platforms.create(400, 460, "ground")
        smaller2.setScale(0.5)
        smaller2.refreshBody()

        //Add additional boxes
        const box2 = this.boxes.create(500, 200, "box") as Phaser.Physics.Arcade.Sprite
        box2.setScale(0.05)
        box2.refreshBody()
        const box3 = this.boxes.create(500, 225, "box") as Phaser.Physics.Arcade.Sprite
        box3.setScale(0.05)
        box3.refreshBody()
        const box4 = this.boxes.create(500, 250, "box") as Phaser.Physics.Arcade.Sprite
        box4.setScale(0.05)
        box4.refreshBody()

        const box5 = this.boxes.create(500, 480, "box") as Phaser.Physics.Arcade.Sprite
        box5.setScale(0.05)
        box5.refreshBody()
        const box6 = this.boxes.create(500, 505, "box") as Phaser.Physics.Arcade.Sprite
        box6.setScale(0.05)
        box6.refreshBody()
        const box7 = this.boxes.create(500, 530, "box") as Phaser.Physics.Arcade.Sprite
        box7.setScale(0.05)
        box7.refreshBody()


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

        // Sets scene physics (please move this)
        this.physics.add.group(this.nextScene)
        this.nextScene.setVisible(false);

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
        this.switchArray.push(new Switch(this, 460, 525, "switch", 2, 0))
        this.switchArray.push(new Switch(this, 460, 255, "switch", 1, 0))
        this.switchArray.push(new Switch(this, 400, 440, "switch", 0, 0))
        this.switches = this.physics.add.group({
            key: "switch",
            immovable: true,
            allowGravity: false,
            setXY: { x: -480, y: 250 }
        //  setXY: { x: 700, y: 60 }
        })

        this.switchArray.forEach(object => {
            this.switches?.add(object);
        })
        
        // this.switches.add(switch0)
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
        this.gateArray[0] = new Gate(this, 300, 220, "gate", 1);
        this.gateArray[0].setScale(1.3)
        this.gateArray[1] = new Gate(this, 300, 510, "gate", 1);
        this.gateArray[1].setScale(1.3)
        this.gateArray[2] = new Gate(this, 700, 480, "gate", 1);
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

        this.physics.add.collider(this.nextScene, this.platforms)
        this.physics.add.overlap(this.nextScene, this.player1, this.handleLoadNextScene, undefined, this)
        this.physics.add.overlap(this.nextScene, this.player2, this.handleLoadNextScene, undefined, this)

        //Code related to buttons
        this.buttonArray = []
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
        this.scene.start('LevelOne')
    }


    update() {
        super.update();
    }
}