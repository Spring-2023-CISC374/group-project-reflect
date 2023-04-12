import Phaser from "phaser";

export default class Gate extends Phaser.Physics.Arcade.Image{
    actives: boolean[] = [false, true, true]

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, actives:number) {
        super(scene, x, y, texture);
        for(let i = 0; i < actives && i < 3; i++){
            this.actives[3-i] = false
        }
        scene.add.existing(this);
    }

    handleActivate(){
        if(this.actives[0] && this.actives[1] && this.actives[2]){
            this.disableBody
        }
        return;
    }
    
    handleDeactivate(){
        if(this.actives[0] && this.actives[1] && this.actives[2]){
            return;
        }
        else{
            this.enableBody
        }
        return;
    }


}