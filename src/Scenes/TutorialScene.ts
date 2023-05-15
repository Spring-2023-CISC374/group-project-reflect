import BaseText from "./BaseText";

export default class TutorialScene extends BaseText {

    constructor() {
        super('TutorialScene');
        console.log("in tutorial scene constructor");
    }

    create() { 
        this.add.image(400, 300, 'background');   
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * 0.25, 'Reflect instructions', { fontSize: '32px' }).setOrigin(0.5, 0.5);

        this.addTextButton('Play Game', 'LevelZero', 250);
        //this.addTextButton('Level 1', 'LevelTwo', 250)
        //this.addTextButton("Level 2", "LevelOne", 300)
        //this.addTextButton("Level 3", "LevelThree", 350)


        this.add.text(300, 200, "Move: use 4 arrow keys").setOrigin(0, 1);

        const gateImage = this.add.image(250, 250, 'gate');
        gateImage.setScale(0.5)
        this.add.text(300, 250, "Gate: block").setOrigin(0, 1);
        
        this.add.image(250, 300, 'switch');
        this.add.text(300, 300, "Switch: Hit (Not required)").setOrigin(0, 1);
        
        this.add.image(250, 350, 'button');
        this.add.text(300, 350, "Button: Stepped on to active").setOrigin(0, 1);
        
        this.add.image(250, 400, 'dude');
        this.add.text(300, 400, "Player: you").setOrigin(0, 1);
        
        const boxImage = this.add.image(250, 450, 'box');
        boxImage.setScale(0.05)
        this.add.text(300, 450, "Box: Jump on").setOrigin(0, 1);

        this.add.text(30, 550, "Hint the switch, active the button to unlock the gates then go to next level.");
    }

}