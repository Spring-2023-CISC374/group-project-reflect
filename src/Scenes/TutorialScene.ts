import BaseText from "./BaseText";

export default class TutorialScene extends BaseText {

    constructor() {
        super('TutorialScene');
        console.log("in tutorial scene constructor");
    }

    create() { 
        this.add.image(400, 300, 'background');   
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * 0.25, 'Reflect instructions', { fontSize: '32px' }).setOrigin(0.5, 0.5);

        this.addTextButton('Level 1', 'LevelOne', 250)
        this.addTextButton("Level 2", "LevelTwo", 300)
        
        let gateImage = this.add.image(300, 250, 'gate');
        gateImage.setScale(0.5)
        this.add.text(350, 250, "Gate: block you").setOrigin(0, 1);
        
        this.add.image(300, 300, 'switch');
        this.add.text(350, 300, "Switch: active button").setOrigin(0, 1);
        
        this.add.image(300, 350, 'button');
        this.add.text(350, 350, "Button: open gate").setOrigin(0, 1);
        
        this.add.image(300, 400, 'dude');
        this.add.text(350, 400, "Player: is you").setOrigin(0, 1);
        
        let boxImage = this.add.image(300, 450, 'box');
        boxImage.setScale(0.05)
        this.add.text(350, 450, "Box: jump high").setOrigin(0, 1);

        this.add.text(280, 550, "Unlock the gates to get next level.").setOrigin(0, 1);
    }

}