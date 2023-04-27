import  {TextButtonObject} from '../Objects/TextButtonObject';


export default class TutorialScene extends Phaser.Scene {

    preload(){
        //this.load.image('background2','./assets/background2.png' )
    }
    constructor() {
        super({ key: 'TutorialScene' });
        console.log("in tutorial scene constructor");
    }


    create() {
        //this.add.image(200,200,'background2');  


        this.add.text(0, this.scale.height, "Unlock the gates to get next level.").setOrigin(0, 1);

        // creates the text button to move to a different level & adds to scene 
        this.add.existing(new TextButtonObject(this, this.scale.height / 2, "Level 1", () => {
            this.scene.start("HelloWorldScene");
        }))

        
    }

}