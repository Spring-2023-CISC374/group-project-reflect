import Phaser from 'phaser'

import HelloWorldScene from './Scenes/HelloWorldScene'
import BaseScene from "./Scenes/BaseScene";
import TutorialScene from './Scenes/TutorialScene';
import EndScene from './Scenes/EndScene';


import LevelTwo from './Scenes/LevelTwo'

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
	scene: [BaseScene, TutorialScene, HelloWorldScene, LevelTwo, EndScene], // 4Scene
}

export default new Phaser.Game(config)
