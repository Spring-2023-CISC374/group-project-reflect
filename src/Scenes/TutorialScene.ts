import BaseText from "./BaseText";

export default class TutorialScene extends BaseText {

    constructor() {
        super('TutorialScene');
        console.log("in tutorial scene constructor");
    }

    create() { 
        this.add.image(400, 300, 'background');   
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * 0.25, 'Reflect instructions', { fontSize: '32px' }).setOrigin(0.5, 0.5);

        this.addTextButton('Level 1', 'LevelTwo', 250)
        this.addTextButton("Level 2", "LevelOne", 300)
        this.addTextButton("Level 3", "LevelThree", 350)
        
        const gateImage = this.add.image(250, 250, 'gate');
        gateImage.setScale(0.5)
        this.add.text(300, 250, "Gate: Clear these to make progress").setOrigin(0, 1);
        
        this.add.image(250, 300, 'blueswitch');
        this.add.text(300, 300, "Switch: Once hit, turns on forever").setOrigin(0, 1);
        
        this.add.image(250, 350, 'blueswitch');
        this.add.text(300, 350, "Button: Turns on only if stepped on").setOrigin(0, 1);
        
        this.add.image(250, 400, 'dude');
        this.add.text(300, 400, "Player: The player character").setOrigin(0, 1);
        
        const boxImage = this.add.image(250, 450, 'box');
        boxImage.setScale(0.05)
        this.add.text(300, 450, "Box: Jump on these to get to high places").setOrigin(0, 1);

        this.add.text(280, 550, "Unlock the gates to get to the next level.").setOrigin(0, 1);
    }

}