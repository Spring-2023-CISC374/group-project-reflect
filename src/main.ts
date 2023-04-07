import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import TwoScene from "./TwoScene";
import ThreeScene from "./ThreeScene";
import FourScene from "./FourScene";

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
	scene: [HelloWorldScene, TwoScene, ThreeScene,FourScene], // 4Scene
}

export default new Phaser.Game(config)
