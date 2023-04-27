import BaseText from "./BaseText";

export default class TutorialScene extends BaseText {
    constructor() {
        super('TutorialScene');
        console.log("in tutorial scene constructor");
    }

    create() { 

        super.create();

        this.add.text(0, this.scale.height, "Unlock the gates to get next level.").setOrigin(0, 1);

        this.addTextButton('Level 1', 'LevelOne', 300)
        this.addTextButton("Level 2", "LevelTwo", 350)
    }

}