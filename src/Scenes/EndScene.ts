import BaseText from "./BaseText";

export default class EndScene extends BaseText {
    constructor() {
        super('EndScene');
    }

    create() { 

        super.create();

        this.addTextButton("Start Tutorial Again", 'TutorialScene', 400)
        this.addTextButton("Start Over", "LevelOne", 500)
    }

}