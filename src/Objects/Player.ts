import Phaser from "phaser";

export default class extends  Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, xCord: number, yCord: number, texture: string, playerID: number) {
        super(scene, xCord, yCord, texture, playerID);
        scene.add.existing(this);
    }
}