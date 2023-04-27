import { TextButtonObject } from "../Objects/TextButtonObject";

export default class BaseText extends Phaser.Scene {
    constructor(keyName: string) {
        super(keyName);
    }

    preload(){
        this.load.image('background','./assets/images/background.png' )
    }

    create() { 
        this.add.image(500, 500, 'background');     
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