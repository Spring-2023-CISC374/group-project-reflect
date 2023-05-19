import Phaser from "phaser";

export default class Switch extends Phaser.Physics.Arcade.Image{
    gateID: number;
    switchID: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, gateID:number, switchID:number) {
        super(scene, x, y, texture);
        this.gateID = gateID;
        this.switchID = switchID;
        scene.add.existing(this);
    }
}