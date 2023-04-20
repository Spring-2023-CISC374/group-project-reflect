import { TextButtonObject } from "./Objects/TextButtonObject";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload(){
        this.load.image('background','./assets/background.png' )
    }

    create() { 
        this.add.image(500, 500, 'background');     
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * 0.25, 'Reflect', { fontSize: '32px' }).setOrigin(0.5, 0.5);

        // creates the text button object to start tutorial & adds to scene 
        this.add.existing(new TextButtonObject(this, 400, 
        "Start Tutorial", () => {
            // starts up the tutorial scene when clicked
            this.scene.start('TutorialScene');
        }))       
        this.add.existing(new TextButtonObject(this, 500, 
        "Play Game", () => {
            // starts up the tutorial scene when clicked
            this.scene.start('HelloWorldScene');
        }))  
    }

}