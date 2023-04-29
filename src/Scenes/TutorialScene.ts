import BaseText from "./BaseText";
import Gate from "../Objects/Gate";
import Switch from "../Objects/Switch";
import Button from '../Objects/Button';
import Player from '../Objects/Player';
export default class TutorialScene extends BaseText {


    private switches?: Phaser.Physics.Arcade.Group;
    private buttons?: Phaser.Physics.Arcade.Group;
    private gates?: Phaser.Physics.Arcade.Group;
    private boxes?: Phaser.Physics.Arcade.StaticGroup;
    private player1?: Player;
    private player2?: Player;

    constructor() {
        super('TutorialScene');
        console.log("in tutorial scene constructor");
    }
    preload() {
        this.load.image("switch", "./assets/images/star.png");
        this.load.image("button", "./assets/images/button.png");
        this.load.image("gate", "./assets/images/BowlingBall.png");
        this.load.image("ground", "./assets/images/platform.png");
        this.load.image("gateA", "./assets/images/star.png");
        // x0.05
        this.load.image("box", "./assets/images/box.png");
        this.load.spritesheet("dude", "./assets/images/dude.png", {
            frameWidth: 32, frameHeight: 48
        });
    }

    create() { 

        super.create();

        this.addTextButton('Level 1', 'LevelOne', 250)
        this.addTextButton("Level 2", "LevelTwo", 300)
        
        let gateImage = this.add.image(100, 250, 'gate');
        gateImage.setScale(0.5)
        
        this.add.text(150, 250, "Gate: block you").setOrigin(0, 1);
        
        this.add.image(100, 300, 'switch');
        this.add.text(150, 300, "Switch: active button").setOrigin(0, 1);
        
        this.add.image(100, 350, 'button');
        this.add.text(150, 350, "Button: open gate").setOrigin(0, 1);
        
        this.add.image(100, 400, 'dude');
        this.add.text(150, 400, "Player: is you").setOrigin(0, 1);
        
        let boxImage = this.add.image(100, 450, 'box');
        boxImage.setScale(0.05)
        this.add.text(150, 450, "Box: jump high").setOrigin(0, 1);

        this.add.text(150, 550, "Unlock the gates to get next level.").setOrigin(0, 1);
    }

}