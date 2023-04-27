// you win
import { TextButtonObject } from "../Objects/TextButtonObject";
export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    preload(){
        this.load.image('background','./assets/images/background.png' )
    }

    create() { 
        this.add.image(500, 500, 'background');     
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * 0.25, 'You Win', { fontSize: '32px' }).setOrigin(0.5, 0.5);

        // creates the text button object to start tutorial & adds to scene 
        this.add.existing(new TextButtonObject(this, 400, 
            "Start Tutorial Again", () => {
                // starts up the tutorial scene when clicked
                this.scene.start('TutorialScene');
            }))       
            this.add.existing(new TextButtonObject(this, 500, 
            "Start Over", () => {
                // starts up the tutorial scene when clicked
                this.scene.start('HelloWorldScene');
            }))  
    }

}