import Phaser from 'phaser'
import Gate from "../Objects/Gate";
import Switch from "../Objects/Switch";
import Button from '../Objects/Button';
import Player from '../Objects/Player';
import { CommonPreload } from './CommonPreload'; 



export default class LevelZero extends CommonPreload {
    constructor() {
        super('LevelZero')
    }


    create() {
        //Makes sky box
        this.add.image(400, 300, 'background');
        //Carries the text from one scene to another
        this.nextScene = this.add.text(775, 510, '->', { color: '#ffffff' });

        // Code Related to platforms and boxes

        // Sets scene physics (please move this)
        this.physics.add.group(this.nextScene)
        this.physics.add.group(this.nextScene2)
        this.nextScene.setVisible(false)

        //Add static groups
        this.platforms = this.physics.add.staticGroup()
        this.boxes = this.physics.add.staticGroup()

        //Add additional tutorial text
        this.add.text(350, 10, 'Tutorial Stage', { color: '#black' });
        this.add.text(450, 490, 'All 3 steps completed?', { color: '#black' });
        this.add.text(450, 510, 'The gate should be open!', { color: '#black' });
        this.add.text(600, 25, "2nd hit the switch", { color: 'black' });
        this.add.text(325, 390, "1st jump on the boxes", { color: 'black' });
        this.add.text(90, 430, "3rd step on the button", { color: 'black' });
        this.add.text(10, 450, "The player", { color: 'black' });
        this.add.text(10, 470, "character", { color: 'black' });

        //Add Base Ground and Box
        const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
        ground.setScale(2)
        ground.refreshBody()

        const box1 = this.boxes.create(400, 425, "box") as Phaser.Physics.Arcade.Sprite
        box1.setScale(0.05)
        box1.refreshBody()

        const box2 = this.boxes.create(500, 325, "box") as Phaser.Physics.Arcade.Sprite
        box2.setScale(0.05)
        box2.refreshBody()

        const box3 = this.boxes.create(600, 225, "box") as Phaser.Physics.Arcade.Sprite
        box3.setScale(0.05)
        box3.refreshBody()

        const box4 = this.boxes.create(700, 125, "box") as Phaser.Physics.Arcade.Sprite
        box4.setScale(0.05)
        box4.refreshBody()


        //Code related to the players
        this.player1 = this.physics.add.existing(new Player(this, 30, 500, "dude", 1))
        this.player1.setCollideWorldBounds(true)
        this.physics.add.collider(this.player1, this.platforms)
        this.physics.add.collider(this.player1, this.boxes)


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
        this.switchArray.push(new Switch(this, 700, 100, "switch", 1, 1)) //false, true, false
        this.switchArray.push(new Switch(this, 700, 100, "switch", 2, 1))
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


        //Code Related to Gates

        this.gates = this.physics.add.group({
            key: "gate",
            immovable: true,
            allowGravity: false,
            setXY: { x: -480, y: 250 }
        })

        this.physics.add.collider(this.gates, this.platforms)
        this.physics.add.collider(this.gates, this.player1)

        // in this case, 0, 1, and 2 are telling the number of bools to turn false
        this.gateArray[1] = new Gate(this, -100, -100, "gate", 2);
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



        //Code related to buttons
        this.buttonArray = []
        this.buttonArray.push(new Button(this, 150, 525, "button", 2, 0))
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
        this.scene.start('LevelTwo')
    }


    update() {
        if (!this.cursors) {
            return
        }

        if (this.cursors?.left.isDown) {
            this.player1?.setVelocityX(-160)
            this.player1?.anims.play("left", true)


        } else if (this.cursors?.right.isDown) {
            this.player1?.setVelocityX(160)
            this.player1?.anims.play("right", true)

        }
        else if(this.cursors?.down.isDown){
            this.player1?.setVelocityY(400);
            this.player1?.anims.play('turn', true)

        }
        else {
            this.player1?.setVelocityX(0)
            this.player1?.anims.play("turn")

        }

        if (this.cursors.up?.isDown && this.player1?.body?.touching.down) {
            this.player1.setVelocityY(-330)
        }


        for(let i = 0; i < this.buttonArray.length; i++){
            if(this.checkOverlap(this.buttonArray[i], this.player1!) == false && this.checkOverlap(this.buttonArray[i], this.player1!) == false){
                 this.gateArray[this.buttonArray[i].gateID].actives[this.buttonArray[i].buttonID] = false;
                 this.buttonArray[i].setTexture("button")
            }       
        }
        if(!this.gateArray.filter(object => object.body?.enable).length) {
            this.nextScene?.setVisible(true)
        }
    }
}