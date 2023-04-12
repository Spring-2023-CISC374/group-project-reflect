import Phaser from "phaser";

export default class Button extends Phaser.Physics.Arcade.Image{
    gateID: number;
    buttonID: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, gateID:number, buttonID:number) {
        super(scene, x, y, texture);
        this.gateID = gateID;
        this.buttonID = buttonID;
        scene.add.existing(this);
    }
}