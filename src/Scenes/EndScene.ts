import BaseText from "./BaseText";

export default class EndScene extends BaseText {
    constructor() {
        super('EndScene');
    }
    create() { 

        super.create();

        this.addTextButton("Start Over", "LevelTwo", 500)
    }

}