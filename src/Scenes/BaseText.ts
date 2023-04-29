import { TextButtonObject } from "../Objects/TextButtonObject";

export default class BaseText extends Phaser.Scene {

    public switches?: Phaser.Physics.Arcade.Group;
    public buttons?: Phaser.Physics.Arcade.Group;
    public gates?: Phaser.Physics.Arcade.Group;
    public boxes?: Phaser.Physics.Arcade.StaticGroup;
    public player1?: Player;
    public player2?: Player;

    constructor(keyName: string) {
        super(keyName);
    }

    preload(){
        this.load.image('background','./assets/images/background.png' );
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
        this.add.image(400, 300, 'background');     
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * 0.25, 'Reflect', { fontSize: '32px' }).setOrigin(0.5, 0.5);  
    }
    

    addTextButton(buttonLabel: string, sceneName: string, heightnum: number){
        // creates the text button object to start tutorial & adds to scene 
        this.add.existing(new TextButtonObject(this, heightnum / 2, 
        buttonLabel, () => {
            // starts up the tutorial scene when clicked
            this.scene.start(sceneName);
        }))  
    }

}