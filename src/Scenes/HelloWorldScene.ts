//aka level 1
import Phaser from 'phaser'
import Gate from "../Objects/Gate";
import Switch from "../Objects/Switch";
import Button from '../Objects/Button';
import Player  from '../Objects/Player';
//import Player from "./Objects/Player";


export default class HelloWorldScene extends Phaser.Scene {
    //Sprite creation
    private switches?: Phaser.Physics.Arcade.Group;
    private switchArray: Switch[] = [];
    private buttons?: Phaser.Physics.Arcade.Group;
    private buttonArray: Button[] = [];
    private gates?: Phaser.Physics.Arcade.Group;
    private gateArray: Gate[] = [];
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private boxes?: Phaser.Physics.Arcade.StaticGroup;
    private player1?: Player;
    private player2?: Player;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
	//Scene Transition
    private nextScene?: Phaser.GameObjects.Text;
    //reset
    private resetText: Phaser.GameObjects.Text | undefined;

    constructor() {
        super('HelloWorldScene')
    }

    preload() {
        this.load.image('sky', './assets/images/sky.png')
        this.load.image("switch", "./assets/images/star.png");
        this.load.image("switchA", "./assets/images/bomb.png");
        this.load.image("button", "./assets/images/button.png");
        this.load.image("buttonA", "./assets/images/buttonA.png");
        this.load.image("gate", "./assets/images/BowlingBall.png");
        this.load.image("ground", "./assets/images/platform.png");
        this.load.image("gateA", "./assets/images/star.png");
        this.load.image("box", "./assets/images/box.png");
        this.load.spritesheet("dude", "./assets/images/dude.png", {
            frameWidth: 32, frameHeight: 48
        });
    }

    create() {
        //Makes sky box
        this.add.image(400, 300, 'sky');
        //Carries the text from one scene to another
        this.nextScene = this.add.text(775, 510, '->', { color: '#ffffff' });

        // Code Related to platforms and boxes
        //reset text top left
        this.resetText = this.add.text(10, 10, 'Reset', { fontFamily: 'Arial', fontSize: '32', color: '#ffffff' });
        

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
        this.platforms.create(200, 280,"ground")
        this.platforms.create(400, 280,"ground")
        this.platforms.create(600, 280,"ground")

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

        // Sets scene physics (please move this)
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

        // array indexes (0, 1, 2) if true, open gate
        // by default all gates are true
        this.switchArray.push(new Switch(this, 700, 60, "switch", 1, 1)) //false, true, false
        this.switchArray.push(new Switch(this, 700, 60, "switch", 2, 1))
        this.switches = this.physics.add.group({
            key: "switch",
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

        this.physics.add.collider(this.nextScene, this.platforms)
        this.physics.add.overlap(this.nextScene, this.player1, this.handleLoadNextScene, undefined, this)
        this.physics.add.overlap(this.nextScene, this.player2, this.handleLoadNextScene, undefined, this)

        //Code related to buttons
        this.buttonArray = []
        this.buttonArray.push(new Button(this, 480, 250, "button", 1, 0))
        this.buttonArray.push(new Button(this, 300, 500, "button", 2, 0))
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
        
        // reset touchable
        this.resetText.setInteractive();
        // monitor reset
        this.resetText.on('pointerdown', () => {
            this.scene.restart();
        });
    }

    //Handle buttons
    private handleHitButton(p: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {
        p;
        const the_button = b as Button
        this.gateArray[the_button.gateID].actives[the_button.buttonID] = true;
        this.handleActivateGate(the_button.gateID);
        the_button.setTexture('buttonA')
    }

    private handleHitSwitch(p: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
        p;
        const the_switch = s as Switch
        this.gateArray[the_switch.gateID].actives[the_switch.switchID] = true;
        this.handleActivateGate(the_switch.gateID);
        the_switch.setTexture("switchA")
    }

    handleActivateGate(gateID: number){
        if(this.gateArray[gateID].actives[0] && this.gateArray[gateID].actives[1] && this.gateArray[gateID].actives[2]){
            this.gateArray[gateID].disableBody(true,true)
        }
        return;
    }

	// sence transition
    private handleLoadNextScene() {
        this.scene.start('LevelTwo')
    }
	//ThreeScene
	//private handleLoadNextScene(player1: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
        //this.scene.start('ThreeScene')
    //}

    //Test code related to buttons
    private checkOverlap(button: Button, sprite: Phaser.Physics.Arcade.Sprite) {
	    var bounds_player = sprite.getBounds();
	    var bounds_button = button.getBounds();
	    return Phaser.Geom.Intersects.RectangleToRectangle(bounds_player, bounds_button);
	}

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
        
        for(let i = 0; i < this.buttonArray.length; i++){
            if(this.checkOverlap(this.buttonArray[i], this.player1!) == false && this.checkOverlap(this.buttonArray[i], this.player2!) == false){
                 this.gateArray[this.buttonArray[i].gateID].actives[this.buttonArray[i].buttonID] = false;
                 this.buttonArray[i].setTexture("button")
            }       
        }
    }
}