import BaseText from "./BaseText";

export default class StartScreen extends BaseText {
    constructor() {
        super('StartScreen');
    }

    create() { 

        super.create();

        this.addTextButton("Start Tutorial", "TutorialScene", 400)
        this.addTextButton("Play Game", "LevelOne", 500)
    }

}