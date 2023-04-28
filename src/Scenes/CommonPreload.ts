// will add more tbc

export default class CommonLevel extends Phaser.Scene {
    //reset
    public resetText: Phaser.GameObjects.Text | undefined;
    //menu
    public menuText: Phaser.GameObjects.Text | undefined;
    //end
    public endText: Phaser.GameObjects.Text | undefined;

    constructor(keyName: string) {
        super(keyName);
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




}