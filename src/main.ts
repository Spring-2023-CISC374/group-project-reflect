import Phaser from 'phaser'

import StartScreen from "./Scenes/StartScreen";
import TutorialScene from './Scenes/TutorialScene';
import EndScene from './Scenes/EndScene';

import LevelOne from './Scenes/LevelOne'
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
	scene: [StartScreen, TutorialScene, LevelOne, LevelTwo, EndScene]
}

export default new Phaser.Game(config)
