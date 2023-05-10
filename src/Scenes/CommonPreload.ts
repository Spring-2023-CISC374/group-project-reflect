// will add more tbc

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