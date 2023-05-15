import BaseText from "./BaseText";

export default class StartScreen extends BaseText {
    constructor() {
        super('StartScreen');
    }

    preload() {
        this.load.video('game', './assets/video/game.mp4');
    }
    create() { 

        super.create();
        const game = this.add.video(0, 0, 'game');
        setTimeout(() => {
            game.setSize(900, 600).setScale(1).setOrigin(0);
            //game.setSize(800, 600).setScale(1).setOrigin(0);
            game.setMute(true);
            game.play(true)
        }, 300)
        game.play(true)
        this.addTextButton("Start Tutorial", "TutorialScene", 700)
        this.addTextButton("Play Game", "LevelOne", 800)
        
        // this.load.image("gateA", "./assets/images/star.png");

    }

}