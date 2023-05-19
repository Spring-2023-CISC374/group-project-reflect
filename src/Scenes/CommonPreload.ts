import Phaser from "phaser";
import Switch from "../Objects/Switch";
import Button from "../Objects/Button";
import Gate from "../Objects/Gate";
import Player from "../Objects/Player";

export class CommonPreload extends Phaser.Scene {
  //reset
  public resetText: Phaser.GameObjects.Text | undefined;
  //menu
  public menuText: Phaser.GameObjects.Text | undefined;
  //end
  public endText: Phaser.GameObjects.Text | undefined;

  //Sprite creation
  public switches?: Phaser.Physics.Arcade.Group;
  public switchArray: Switch[] = [];
  public buttons?: Phaser.Physics.Arcade.Group;
  public buttonArray: Button[] = [];
  public buttonArrayT: Button[] = [];
  public buttonsT?: Phaser.Physics.Arcade.Group;
  public gates?: Phaser.Physics.Arcade.Group;
  public gateArray: Gate[] = [];
  public platforms?: Phaser.Physics.Arcade.StaticGroup;
  public boxes?: Phaser.Physics.Arcade.StaticGroup;
  public player1?: Player;
  public player2?: Player;
  public cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  //Scene Transition
  public nextScene?: Phaser.GameObjects.Text;
  public nextScene2?: Phaser.GameObjects.Text;

  constructor(keyName: string) {
    super(keyName);
  }

  preload() {
    this.load.image('sky', './assets/images/sky.png')
    this.load.image("switch", "./assets/images/redswitch.png");
    this.load.image("switchA", "./assets/images/redoff.png");
    this.load.image("button", "./assets/images/yellowswitch.png");
    this.load.image("buttonA", "./assets/images/yellowoff.png");
    this.load.image("gate", "./assets/images/reddoor.png");
    this.load.image("ground", "./assets/images/platform.png");
    this.load.image("gateA", "./assets/images/star.png");
    this.load.image("box", "./assets/images/box.png");
    this.load.spritesheet("dude", "./assets/images/dude.png", {
      frameWidth: 32, frameHeight: 48
    });
  }

  public handleHitButton(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_button = b as Button
    this.gateArray[the_button.gateID].actives[the_button.buttonID] = true;
    this.handleActivateGate(the_button.gateID);
    the_button.setTexture('buttonA')
  }

  public handleHitSwitch(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_switch = s as Switch
    this.gateArray[the_switch.gateID].actives[the_switch.switchID] = true;
    this.handleActivateGate(the_switch.gateID);
    the_switch.setTexture("switchA")
  }

  public handleActivateGate(gateID: number) {
    if (this.gateArray[gateID].actives[0] && this.gateArray[gateID].actives[1] && this.gateArray[gateID].actives[2]) {
        this.gateArray[gateID].disableBody(true, true)
    }
    return;
  }


  public handleDeactivateGate(gateID: number) {
    if (this.gateArray[gateID].actives[0] && this.gateArray[gateID].actives[1] && this.gateArray[gateID].actives[2]) {
        return;
    }
    else{
        this.gateArray[gateID].enableBody(false, this.gateArray[gateID].x, this.gateArray[gateID].y, true, true)
    }
}

public checkOverlap(button: Button, sprite: Phaser.Physics.Arcade.Sprite) {
  const bounds_player = sprite.getBounds();
  const bounds_button = button.getBounds();
  return Phaser.Geom.Intersects.RectangleToRectangle(bounds_player, bounds_button);
}

update() {
  if (!this.cursors) {
      return
  }

  if (this.cursors?.left.isDown) {
      this.player1?.setVelocityX(-160)
      this.player1?.anims.play("left", true)
      this.player2?.setVelocityX(-160)
      this.player2?.anims.play("left", true)

  } else if (this.cursors?.right.isDown) {
      this.player1?.setVelocityX(160)
      this.player1?.anims.play("right", true)
      this.player2?.setVelocityX(160)
      this.player2?.anims.play("right", true)
  }
  else if(this.cursors?.down.isDown){
      this.player1?.setVelocityY(400);
      this.player1?.anims.play('turn', true)
      this.player2?.setVelocityY(400);
      this.player2?.anims.play('turn', true)
  }
  else {
      this.player1?.setVelocityX(0)
      this.player1?.anims.play("turn")
      this.player2?.setVelocityX(0)
      this.player2?.anims.play("turn")
  }

  if (this.cursors.up?.isDown && this.player1?.body?.touching.down) {
      this.player1.setVelocityY(-330)
  }

  if (this.cursors.up?.isDown && this.player2?.body?.touching.down) {
      this.player2.setVelocityY(-330)
  }
  
  for(let i = 0; i < this.buttonArray.length; i++){
      if(this.checkOverlap(this.buttonArray[i], this.player1!) == false && this.checkOverlap(this.buttonArray[i], this.player2!) == false){
           this.gateArray[this.buttonArray[i].gateID].actives[this.buttonArray[i].buttonID] = false;
           this.buttonArray[i].setTexture("button")
      }       
  }
  if(!this.gateArray.filter(object => object.body?.enable).length) {
      this.nextScene?.setVisible(true)
  }
}

}

export class LevelZero extends CommonPreload {
  constructor() {
    super('LevelZero')
  }

}

export class LevelOne extends CommonPreload {
  constructor() {
    super('LevelOne')
  }

}

export class LevelTwo extends CommonPreload {
  constructor() {
    super('LevelTwo')
  }

}

export class LevelThree extends CommonPreload {
  constructor() {
    super('LevelThree')
  }

}