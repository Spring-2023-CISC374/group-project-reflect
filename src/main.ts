import Phaser from 'phaser'

import HelloWorldScene from './Scenes/HelloWorldScene'
import TwoScene from "./Scenes/TwoScene";
import ThreeScene from "./Scenes/ThreeScene";
import FourScene from "./Scenes/FourScene";
import MainMenu from "./Scenes/MainMenu";
import TutorialScene from './Scenes/TutorialScene';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 400 },
		},
	},
	scene: [MainMenu, TutorialScene,HelloWorldScene, TwoScene, ThreeScene,FourScene], // 4Scene
}

export default new Phaser.Game(config)
