// will add more tbc

import Phaser from "phaser";
import Switch from "../Objects/Switch";
import Button from "../Objects/Button";
import Gate from "../Objects/Gate";
import Player from "../Objects/Player";
import ButtonTrap from "../Objects/ButtonTrap";

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
    this.load.image("switch", "./assets/images/blueswitch.png");
    this.load.image("switchA", "./assets/images/blueoff.png");
    this.load.image("button", "./assets/images/redswitch.png");
    this.load.image("buttonA", "./assets/images/redoff.png");
    this.load.image("gate", "./assets/images/bluedoor.png");
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


  create() {
    //Makes sky box
    this.add.image(400, 300, 'sky');
    //Carries the text from one scene to another
    this.nextScene = this.add.text(775, 510, '->', {color: '#ffffff'});
    this.nextScene2 = this.add.text(775, 210, '->', {color: '#ffffff'});

    // Code Related to platforms and boxes

    // Sets scene physics (please move this)
    this.physics.add.group(this.nextScene)
    this.physics.add.group(this.nextScene2)
    this.nextScene.setVisible(false)
    this.nextScene2.setVisible(false)

    //Add static groups
    this.platforms = this.physics.add.staticGroup()
    this.boxes = this.physics.add.staticGroup()

    //Add Base Ground and Box
    const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
    ground.setScale(2)
    ground.refreshBody()
    const box = this.boxes.create(200, 525, "box") as Phaser.Physics.Arcade.Sprite
    box.setScale(0.05)
    box.refreshBody()

    //Add Higher Ground for the other sprite
    this.platforms.create(200, 280, "ground")
    this.platforms.create(400, 280, "ground")
    this.platforms.create(600, 280, "ground")

    //Add additional platforms
    this.platforms.create(700, 100, "ground")

    //Add additional boxes
    const box2 = this.boxes.create(400, 250, "box") as Phaser.Physics.Arcade.Sprite
    box2.setScale(0.05)
    box2.refreshBody()
    const box3 = this.boxes.create(430, 250, "box") as Phaser.Physics.Arcade.Sprite
    box3.setScale(0.05)
    box3.refreshBody()
    const box4 = this.boxes.create(430, 220, "box") as Phaser.Physics.Arcade.Sprite
    box4.setScale(0.05)
    box4.refreshBody()

    //Code related to the players
    this.player1 = this.physics.add.existing(new Player(this, 100, 430, "dude", 1))
    this.player2 = this.physics.add.existing(new Player(this, 100, 230, "dude", 2))
    this.player1.setCollideWorldBounds(true)
    this.physics.add.collider(this.player1, this.platforms)
    this.physics.add.collider(this.player1, this.boxes)
    this.player2.setBounce(0.1)
    this.player2.setCollideWorldBounds(true)
    this.physics.add.collider(this.player2, this.platforms)
    this.physics.add.collider(this.player2, this.boxes)
        
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0, end: 3
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "turn",
      frames: [{key: "dude", frame: 4}],
      frameRate: 20
    })

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5, end: 8
      }),
      frameRate: 10,
      repeat: -1
    })


    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5, end: 8
      }),
      frameRate: 10,
      repeat: -1
    })
    //Allow for key presses
    this.cursors = this.input.keyboard?.createCursorKeys()

    //Code related to switches
    this.switchArray = []

    // array indexes (0, 1, 2) if true, open gate
    // by default all gates are true
    this.switchArray.push(new Switch(this, 700, 60, "switch", 1, 1)) //false, true, false
    this.switchArray.push(new Switch(this, 700, 60, "switch", 2, 1))
    this.switches = this.physics.add.group({
      key: "switch",
      setXY: {x: -480, y: 250}
      //  setXY: { x: 700, y: 60 }
    })

    this.switchArray.forEach(object => {
      this.switches?.add(object);
    })

    // this.switches.add(switch0)
    this.physics.add.collider(this.switches, this.platforms)
    this.physics.add.overlap(this.player1, this.switches, this.handleHitSwitch, undefined, this)
    this.physics.add.overlap(this.player2, this.switches, this.handleHitSwitch, undefined, this)


    //Code Related to Gates

    this.gates = this.physics.add.group({
      key: "gate",
      immovable: true,
      allowGravity: false,
      setXY: {x: -480, y: 250}
    })

    this.physics.add.collider(this.gates, this.platforms)
    this.physics.add.collider(this.gates, this.player1)
    this.physics.add.collider(this.gates, this.player2)

    // in this case, 0, 1, and 2 are telling the number of bools to turn false
    this.gateArray[0] = new Gate(this, -500, -250, "gate", 0);
    this.gateArray[0].setScale(2.5)
    this.gateArray[1] = new Gate(this, 700, 220, "gate", 2);
    this.gateArray[1].setScale(2.5)
    this.gateArray[2] = new Gate(this, 700, 480, "gate", 2);
    this.gateArray[2].setScale(2.5)

    this.gateArray.forEach(object => {
      this.gates?.add(object);
    })
    // for scene transition
    if (this.nextScene) {
      this.tweens.add({
        targets: this.nextScene,
        x: this.nextScene.x + 10,
        duration: 500,
        ease: 'Sine.ease',
        yoyo: true,
        repeat: -1,
      });
    }
    // for scene transition
    if (this.nextScene2) {
      this.tweens.add({
        targets: this.nextScene2,
        x: this.nextScene2.x + 10,
        duration: 500,
        ease: 'Sine.ease',
        yoyo: true,
        repeat: -1,
      });
    }

    this.physics.add.collider(this.nextScene, this.platforms)
    this.physics.add.overlap(this.nextScene, this.player1, this.handleLoadNextScene, undefined, this)
    this.physics.add.overlap(this.nextScene, this.player2, this.handleLoadNextScene, undefined, this)


    this.physics.add.collider(this.nextScene2, this.platforms)
    this.physics.add.overlap(this.nextScene2, this.player1, this.handleLoadNextScene, undefined, this)
    this.physics.add.overlap(this.nextScene2, this.player2, this.handleLoadNextScene, undefined, this)

    //Code related to buttons
    this.buttonArray = []
    this.buttonArray.push(new Button(this, 480, 250, "button", 1, 0))
    this.buttonArray.push(new Button(this, 300, 500, "button", 2, 0))
    this.buttons = this.physics.add.group({
      key: "button",
      setXY: {x: -480, y: 250}
    })

    this.buttonArray.forEach(object => {
      this.buttons?.add(object);
    })

    this.physics.add.collider(this.buttons, this.platforms)
    this.physics.add.overlap(this.player1, this.buttons, this.handleHitButton, undefined, this)
    this.physics.add.overlap(this.player2, this.buttons, this.handleHitButton, undefined, this)


    //reset text top left
    this.resetText = this.add.text(10, 10, 'Reset', {fontFamily: 'Times New Roman', fontSize: '13', color: 'yellow'});
    //Menu top left
    this.menuText = this.add.text(50, 10, 'Menu', {fontFamily: 'Times New Roman', fontSize: '13', color: 'purple'});

    // reset touchable
    this.resetText.setInteractive();

    // monitor reset
    this.resetText.on('pointerdown', () => {
      this.scene.restart();
    });

    // reset touchable
    this.menuText.setInteractive();

    // monitor reset
    this.menuText.on('pointerdown', () => {
      this.scene.start('StartScreen');
    });

  }

  //Handle buttons
  private handleHitButton(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_button = b as Button
    this.gateArray[the_button.gateID].actives[the_button.buttonID] = true;
    this.handleActivateGate(the_button.gateID);
    the_button.setTexture('buttonA')
  }

  private handleHitSwitch(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_switch = s as Switch
    this.gateArray[the_switch.gateID].actives[the_switch.switchID] = true;
    this.handleActivateGate(the_switch.gateID);
    the_switch.setTexture("switchA")
  }

  handleActivateGate(gateID: number) {
    if (this.gateArray[gateID].actives[0] && this.gateArray[gateID].actives[1] && this.gateArray[gateID].actives[2]) {
      this.gateArray[gateID].disableBody(true, true)
    }
    return;
  }

  handleDeactivateGate(gateID: number) {
    if (this.gateArray[gateID].actives[0] && this.gateArray[gateID].actives[1] && this.gateArray[gateID].actives[2]) {
      return;
    } else {
      this.gateArray[gateID].enableBody(false, this.gateArray[gateID].x, this.gateArray[gateID].y, true, true)
    }
  }

  // sence transition
  private handleLoadNextScene() {
    if (this.gateArray.filter(object => object.body?.enable).length < 2) {
      this.nextScene?.setVisible(true)
      this.nextScene2?.setVisible(true)
    }
    if(this.nextScene?.visible && this.nextScene2?.visible) {
      this.scene.start('LevelThree')
    }
  }

  //ThreeScene
  //private handleLoadNextScene(player1: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
  //this.scene.start('ThreeScene')
  //}

  //Test code related to buttons
  private checkOverlap(button: Button, sprite: Phaser.Physics.Arcade.Sprite) {
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
    } else if (this.cursors?.down.isDown) {
      this.player1?.setVelocityY(400);
      this.player1?.anims.play('turn', true)
      this.player2?.setVelocityY(400);
      this.player2?.anims.play('turn', true)
    } else {
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

    for (let i = 0; i < this.buttonArray.length; i++) {
      if (!this.checkOverlap(this.buttonArray[i], this.player1!) && !this.checkOverlap(this.buttonArray[i], this.player2!)) {
        this.gateArray[this.buttonArray[i].gateID].actives[this.buttonArray[i].buttonID] = false;
        this.buttonArray[i].setTexture("button")
      }
    }

    for (let i = 0; i < this.buttonArrayT.length; i++) {
      if (!this.checkOverlap(this.buttonArrayT[i], this.player1!) && !this.checkOverlap(this.buttonArrayT[i], this.player2!)) {
        this.gateArray[this.buttonArrayT[i].gateID].actives[this.buttonArrayT[i].buttonID] = false;
        this.buttonArrayT[i].setTexture("button")
      }
    }

    if (this.gateArray.filter(object => object.body?.enable).length < 2) {
      this.nextScene?.setVisible(true)
      this.nextScene2?.setVisible(true)
    }
  }

}

export class LevelTwo extends CommonPreload {
  constructor() {
    super('LevelTwo')
  }


  create() {
    //Makes sky box
    this.add.image(400, 300, 'sky');
    //Carries the text from one scene to another
    this.nextScene = this.add.text(775, 510, '->', {color: '#ffffff'});

    // Code Related to platforms and boxes


    //Add static groups
    this.platforms = this.physics.add.staticGroup()
    this.boxes = this.physics.add.staticGroup()

    //Add Base Ground and Box
    const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
    ground.setScale(2)
    ground.refreshBody()
    //const box = this.boxes.create(200, 525, "box") as Phaser.Physics.Arcade.Sprite
    //box.setScale(0.05)
    //box.refreshBody()

    //Add Higher Ground for the other sprite
    this.platforms.create(200, 280, "ground")
    this.platforms.create(400, 280, "ground")

    //Add additional platforms
    const smaller = this.platforms.create(400, 180, "ground")
    smaller.setScale(0.5)
    smaller.refreshBody()
    const smaller2 = this.platforms.create(400, 460, "ground")
    smaller2.setScale(0.5)
    smaller2.refreshBody()

    //Add additional boxes
    const box2 = this.boxes.create(500, 200, "box") as Phaser.Physics.Arcade.Sprite
    box2.setScale(0.05)
    box2.refreshBody()
    const box3 = this.boxes.create(500, 225, "box") as Phaser.Physics.Arcade.Sprite
    box3.setScale(0.05)
    box3.refreshBody()
    const box4 = this.boxes.create(500, 250, "box") as Phaser.Physics.Arcade.Sprite
    box4.setScale(0.05)
    box4.refreshBody()

    const box5 = this.boxes.create(500, 480, "box") as Phaser.Physics.Arcade.Sprite
    box5.setScale(0.05)
    box5.refreshBody()
    const box6 = this.boxes.create(500, 505, "box") as Phaser.Physics.Arcade.Sprite
    box6.setScale(0.05)
    box6.refreshBody()
    const box7 = this.boxes.create(500, 530, "box") as Phaser.Physics.Arcade.Sprite
    box7.setScale(0.05)
    box7.refreshBody()


    //Code related to the players
    this.player1 = this.physics.add.existing(new Player(this, 100, 430, "dude", 1))
    this.player2 = this.physics.add.existing(new Player(this, 100, 230, "dude", 2))
    this.player1.setCollideWorldBounds(true)
    this.physics.add.collider(this.player1, this.platforms)
    this.physics.add.collider(this.player1, this.boxes)
    this.player2.setBounce(0.1)
    this.player2.setCollideWorldBounds(true)
    this.physics.add.collider(this.player2, this.platforms)
    this.physics.add.collider(this.player2, this.boxes)

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0, end: 3
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "turn",
      frames: [{key: "dude", frame: 4}],
      frameRate: 20
    })

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5, end: 8
      }),
      frameRate: 10,
      repeat: -1
    })

    // Sets scene physics (please move this)
    this.physics.add.group(this.nextScene)
    this.nextScene.setVisible(false);

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5, end: 8
      }),
      frameRate: 10,
      repeat: -1
    })


    //Allow for key presses
    this.cursors = this.input.keyboard?.createCursorKeys()

    //Code related to switches
    this.switchArray = []

    // array indexes (0, 1, 2) if true, open gate
    // by default all gates are true
    this.switchArray.push(new Switch(this, 460, 500, "switch", 2, 0))
    this.switchArray.push(new Switch(this, 460, 250, "switch", 1, 0))
    this.switchArray.push(new Switch(this, 400, 350, "switch", 0, 0))
    this.switches = this.physics.add.group({
      key: "switch",
      setXY: {x: -480, y: 250}
      //  setXY: { x: 700, y: 60 }
    })

    this.switchArray.forEach(object => {
      this.switches?.add(object);
    })

    // this.switches.add(switch0)
    this.physics.add.collider(this.switches, this.platforms)
    this.physics.add.overlap(this.player1, this.switches, this.handleHitSwitch, undefined, this)
    this.physics.add.overlap(this.player2, this.switches, this.handleHitSwitch, undefined, this)


    //Code Related to Gates

    this.gates = this.physics.add.group({
      key: "gate",
      immovable: true,
      allowGravity: false,
      setXY: {x: -480, y: 250}
    })

    this.physics.add.collider(this.gates, this.platforms)
    this.physics.add.collider(this.gates, this.player1)
    this.physics.add.collider(this.gates, this.player2)

    // in this case, 0, 1, and 2 are telling the number of bools to turn false
    this.gateArray[0] = new Gate(this, 300, 220, "gate", 1);
    this.gateArray[0].setScale(1.3)
    this.gateArray[1] = new Gate(this, 300, 510, "gate", 1);
    this.gateArray[1].setScale(1.3)
    this.gateArray[2] = new Gate(this, 700, 480, "gate", 1);
    this.gateArray[2].setScale(2.5)

    this.gateArray.forEach(object => {
      this.gates?.add(object);
    })
    // for scene transition
    if (this.nextScene) {
      this.tweens.add({
        targets: this.nextScene,
        x: this.nextScene.x + 10,
        duration: 500,
        ease: 'Sine.ease',
        yoyo: true,
        repeat: -1,
      });
    }

    this.physics.add.collider(this.nextScene, this.platforms)
    this.physics.add.overlap(this.nextScene, this.player1, this.handleLoadNextScene, undefined, this)
    this.physics.add.overlap(this.nextScene, this.player2, this.handleLoadNextScene, undefined, this)

    //Code related to buttons
    this.buttonArray = []
    //this.buttonArray.push(new Button(this, 460, 250, "button", 2, 0))
    //this.buttonArray.push(new Button(this, 400, 350, "button", 1, 0))
    this.buttons = this.physics.add.group({
      key: "button",
      setXY: {x: -480, y: 250}
    })

    this.buttonArray.forEach(object => {
      this.buttons?.add(object);
    })

    this.physics.add.collider(this.buttons, this.platforms)
    this.physics.add.overlap(this.player1, this.buttons, this.handleHitButton, undefined, this)
    this.physics.add.overlap(this.player2, this.buttons, this.handleHitButton, undefined, this)


    //reset text top left
    this.resetText = this.add.text(10, 10, 'Reset', {fontFamily: 'Times New Roman', fontSize: '13', color: 'yellow'});
    //Menu top left
    this.menuText = this.add.text(50, 10, 'Menu', {fontFamily: 'Times New Roman', fontSize: '13', color: 'purple'});

    // reset touchable
    this.resetText.setInteractive();

    // monitor reset
    this.resetText.on('pointerdown', () => {
      this.scene.restart();
    });

    // reset touchable
    this.menuText.setInteractive();

    // monitor reset
    this.menuText.on('pointerdown', () => {
      this.scene.start('StartScreen');
    });
  }

  //Handle buttons
  private handleHitButton(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_button = b as Button
    this.gateArray[the_button.gateID].actives[the_button.buttonID] = true;
    this.handleActivateGate(the_button.gateID);
    the_button.setTexture('buttonA')
  }

  private handleHitSwitch(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_switch = s as Switch
    this.gateArray[the_switch.gateID].actives[the_switch.switchID] = true;
    this.handleActivateGate(the_switch.gateID);
    the_switch.setTexture("switchA")
  }

  handleActivateGate(gateID: number) {
    if (this.gateArray[gateID].actives[0] && this.gateArray[gateID].actives[1] && this.gateArray[gateID].actives[2]) {
      this.gateArray[gateID].disableBody(true, true)
    }
    return;
  }

  // sence transition
  private handleLoadNextScene() {
    this.scene.start('LevelOne')
  }

  //ThreeScene
  //private handleLoadNextScene(player1: Phaser.GameObjects.GameObject, sA: Phaser.GameObjects.GameObject) {
  //this.scene.start('ThreeScene')
  //}

  //Test code related to buttons
  private checkOverlap(button: Button, sprite: Phaser.Physics.Arcade.Sprite) {
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
    } else if (this.cursors?.down.isDown) {
      this.player1?.setVelocityY(400);
      this.player1?.anims.play('turn', true)
      this.player2?.setVelocityY(400);
      this.player2?.anims.play('turn', true)
    } else {
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

    for (let i = 0; i < this.buttonArray.length; i++) {
      if (this.checkOverlap(this.buttonArray[i], this.player1!) == false && this.checkOverlap(this.buttonArray[i], this.player2!) == false) {
        this.gateArray[this.buttonArray[i].gateID].actives[this.buttonArray[i].buttonID] = false;
        this.buttonArray[i].setTexture("button")
      }
    }
    if (!this.gateArray.filter(object => object.body?.enable).length) {
      this.nextScene?.setVisible(true)
    }
  }
}

export class LevelThree extends CommonPreload {

  //Sprite creation
  //   private switches?: Phaser.Physics.Arcade.Group;
  //   private switchArray: Switch[] = [];
  //   private buttons?: Phaser.Physics.Arcade.Group;
  //   private buttonArray: Button[] = [];
  //   private buttonsT?: Phaser.Physics.Arcade.Group;
  //   private buttonArrayT: Button[] = [];
  //   private gates?: Phaser.Physics.Arcade.Group;
  //   private gateArray: Gate[] = [];
  //   private platforms?: Phaser.Physics.Arcade.StaticGroup;
  //   private boxes?: Phaser.Physics.Arcade.StaticGroup;
  //   private player1?: Player;
  //   private player2?: Player;
  //   private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  // //Scene Transition
  //   private nextScene?: Phaser.GameObjects.Text;
  //   private nextScene2?: Phaser.GameObjects.Text;


  constructor() {
    super('LevelThree')
  }


  create() {
    //Makes sky box
    this.add.image(400, 300, 'sky');
    //Carries the text from one scene to another
    this.nextScene = this.add.text(775, 510, '->', {color: '#ffffff'});
    this.nextScene2 = this.add.text(775, 210, '->', {color: '#ffffff'});

    // Code Related to platforms and boxes

    // Sets scene physics (please move this)
    this.physics.add.group(this.nextScene)
    this.physics.add.group(this.nextScene2)
    this.nextScene.setVisible(false)
    this.nextScene2.setVisible(false)

    //Add static groups
    this.platforms = this.physics.add.staticGroup()
    this.boxes = this.physics.add.staticGroup()

    //Add Base Ground and Box
    const ground = this.platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Sprite
    ground.setScale(2)
    ground.refreshBody()

    //Add Higher Ground for the other sprite
    this.platforms.create(200, 280, "ground")
    this.platforms.create(400, 280, "ground")

    //Smaller platforms
    const smaller = this.platforms.create(430, 180, "ground")
    smaller.setScale(0.5)
    smaller.refreshBody()
    const smaller2 = this.platforms.create(400, 460, "ground")
    smaller2.setScale(0.5)
    smaller2.refreshBody()

    //Add additional boxes
    const box2 = this.boxes.create(70, 250, "box") as Phaser.Physics.Arcade.Sprite
    box2.setScale(0.05)
    box2.refreshBody()
    const box3 = this.boxes.create(130, 250, "box") as Phaser.Physics.Arcade.Sprite
    box3.setScale(0.05)
    box3.refreshBody()
    const box4 = this.boxes.create(65, 525, "box") as Phaser.Physics.Arcade.Sprite
    box4.setScale(0.05)
    box4.refreshBody()
    const box5 = this.boxes.create(130, 525, "box") as Phaser.Physics.Arcade.Sprite
    box5.setScale(0.05)
    box5.refreshBody()

    const boxt = this.boxes.create(250, 250, "box") as Phaser.Physics.Arcade.Sprite
    boxt.setScale(0.05)
    boxt.refreshBody()


    // walls
    const boxx = this.boxes.create(530, 200, "box") as Phaser.Physics.Arcade.Sprite
    boxx.setScale(0.05)
    boxx.refreshBody()
    const boxxx = this.boxes.create(530, 225, "box") as Phaser.Physics.Arcade.Sprite
    boxxx.setScale(0.05)
    boxxx.refreshBody()
    const boxy = this.boxes.create(530, 250, "box") as Phaser.Physics.Arcade.Sprite
    boxy.setScale(0.05)
    boxy.refreshBody()

    const boxyy = this.boxes.create(500, 480, "box") as Phaser.Physics.Arcade.Sprite
    boxyy.setScale(0.05)
    boxyy.refreshBody()
    const boxz = this.boxes.create(500, 505, "box") as Phaser.Physics.Arcade.Sprite
    boxz.setScale(0.05)
    boxz.refreshBody()
    const boxzz = this.boxes.create(500, 530, "box") as Phaser.Physics.Arcade.Sprite
    boxzz.setScale(0.05)
    boxzz.refreshBody()


    //Code related to the players
    this.player1 = this.physics.add.existing(new Player(this, 100, 500, "dude", 1))
    this.player2 = this.physics.add.existing(new Player(this, 100, 230, "dude", 2))
    this.player1.setCollideWorldBounds(true)
    this.physics.add.collider(this.player1, this.platforms)
    this.physics.add.collider(this.player1, this.boxes)
    this.player2.setBounce(0.1)
    this.player2.setCollideWorldBounds(true)
    this.physics.add.collider(this.player2, this.platforms)
    this.physics.add.collider(this.player2, this.boxes)


    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0, end: 3
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "turn",
      frames: [{key: "dude", frame: 4}],
      frameRate: 20
    })

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5, end: 8
      }),
      frameRate: 10,
      repeat: -1
    })


    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5, end: 8
      }),
      frameRate: 10,
      repeat: -1
    })
    //Allow for key presses
    this.cursors = this.input.keyboard?.createCursorKeys()

    //Code related to switches
    this.switchArray = []

    // array indexes (0, 1, 2) if true, open gate
    // by default all gates are true
    this.switches = this.physics.add.group({
      key: "switch",
      setXY: {x: -480, y: 250}
      //  setXY: { x: 700, y: 60 }
    })

    this.switchArray.forEach(object => {
      this.switches?.add(object);
    })

    // this.switches.add(switch0)
    this.physics.add.collider(this.switches, this.platforms)
    this.physics.add.overlap(this.player1, this.switches, this.handleHitSwitch, undefined, this)
    this.physics.add.overlap(this.player2, this.switches, this.handleHitSwitch, undefined, this)


    //Code Related to Gates

    this.gates = this.physics.add.group({
      key: "gate",
      immovable: true,
      allowGravity: false,
      setXY: {x: -480, y: 250}
    })

    this.physics.add.collider(this.gates, this.platforms)
    this.physics.add.collider(this.gates, this.player1)
    this.physics.add.collider(this.gates, this.player2)

    // in this case, 0, 1, and 2 are telling the number of bools to turn false
    this.gateArray[0] = new Gate(this, 300, 220, "gate", 1);
    this.gateArray[0].setScale(1.3)
    this.gateArray[1] = new Gate(this, 300, 510, "gate", 1);
    this.gateArray[1].setScale(1.3)
    this.gateArray[2] = new Gate(this, 700, 480, "gate", 0);
    this.gateArray[2].setScale(2.5)

    this.gateArray.forEach(object => {
      this.gates?.add(object);
    })
    // for scene transition
    if (this.nextScene) {
      this.tweens.add({
        targets: this.nextScene,
        x: this.nextScene.x + 10,
        duration: 500,
        ease: 'Sine.ease',
        yoyo: true,
        repeat: -1,
      });
    }
    // for scene transition
    if (this.nextScene2) {
      this.tweens.add({
        targets: this.nextScene2,
        x: this.nextScene2.x + 10,
        duration: 500,
        ease: 'Sine.ease',
        yoyo: true,
        repeat: -1,
      });
    }

    this.physics.add.collider(this.nextScene, this.platforms)
    this.physics.add.overlap(this.nextScene, this.player1, this.handleLoadNextScene, undefined, this)
    this.physics.add.overlap(this.nextScene, this.player2, this.handleLoadNextScene, undefined, this)


    this.physics.add.collider(this.nextScene2, this.platforms)
    this.physics.add.overlap(this.nextScene2, this.player1, this.handleLoadNextScene, undefined, this)
    this.physics.add.overlap(this.nextScene2, this.player2, this.handleLoadNextScene, undefined, this)

    //Code related to buttons
    this.buttonArray = []
    this.buttonArrayT = []

    this.buttonArray.push(new Button(this, 100, 230, "button", 0, 0))
    this.buttonArray.push(new Button(this, 100, 480, "button", 0, 1))
    this.buttonArray.push(new Button(this, 100, 230, "button", 1, 0))
    this.buttonArray.push(new Button(this, 100, 480, "button", 1, 1))

    this.buttonArray.push(new Button(this, 460, 500, "button", 2, 1))

    this.buttonArrayT.push(new ButtonTrap(this, 460, 500, "button", 1, 1))

    this.buttonArrayT.push(new ButtonTrap(this, 400, 230, "button", 0, 1))

    this.buttons = this.physics.add.group({
      key: "button",
      setXY: {x: -480, y: 250}
    })

    this.buttonsT = this.physics.add.group({
      key: "button",
      setXY: {x: -480, y: 250}
    })

    this.buttonArray.forEach(object => {
      this.buttons?.add(object);
    })

    this.buttonArrayT.forEach(object => {
      this.buttonsT?.add(object);
    })

    this.physics.add.collider(this.buttons, this.platforms)
    this.physics.add.overlap(this.player1, this.buttons, this.handleHitButton, undefined, this)
    this.physics.add.overlap(this.player2, this.buttons, this.handleHitButton, undefined, this)

    this.physics.add.collider(this.buttonsT, this.platforms)
    this.physics.add.overlap(this.player1, this.buttonsT, this.handleHitButtonTrap, undefined, this)
    this.physics.add.overlap(this.player2, this.buttonsT, this.handleHitButtonTrap, undefined, this)


    //reset text top left
    this.resetText = this.add.text(10, 10, 'Reset', {fontFamily: 'Times New Roman', fontSize: '13', color: 'yellow'});
    //Menu top left
    this.menuText = this.add.text(50, 10, 'Menu', {fontFamily: 'Times New Roman', fontSize: '13', color: 'purple'});

    // reset touchable
    this.resetText.setInteractive();

    // monitor reset
    this.resetText.on('pointerdown', () => {
      this.scene.restart();
    });

    // reset touchable
    this.menuText.setInteractive();

    // monitor reset
    this.menuText.on('pointerdown', () => {
      this.scene.start('StartScreen');
    });

  }

  //Handle buttons
  private handleHitButton(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_button = b as Button
    this.gateArray[the_button.gateID].actives[the_button.buttonID] = true;
    this.handleActivateGate(the_button.gateID);
    the_button.setTexture('buttonA')
  }

  private handleHitButtonTrap(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_button = b as ButtonTrap
    this.gateArray[the_button.gateID].actives[the_button.buttonID] = false;
    this.handleDeactivateGate(the_button.gateID);
    the_button.setTexture('buttonA')
  }

  private handleHitSwitch(p: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
    p;
    const the_switch = s as Switch
    this.gateArray[the_switch.gateID].actives[the_switch.switchID] = true;
    this.handleActivateGate(the_switch.gateID);
    the_switch.setTexture("switchA")
  }

  handleActivateGate(gateID: number) {
    if (this.gateArray[gateID].actives[0] && this.gateArray[gateID].actives[1] && this.gateArray[gateID].actives[2]) {
      this.gateArray[gateID].disableBody(true, true)
    }
    return;
  }


  handleDeactivateGate(gateID: number) {
    if (this.gateArray[gateID].actives[0] && this.gateArray[gateID].actives[1] && this.gateArray[gateID].actives[2]) {
      return;
    } else {
      this.gateArray[gateID].enableBody(false, this.gateArray[gateID].x, this.gateArray[gateID].y, true, true)
    }
  }


  // sence transition
  private handleLoadNextScene() {
    this.scene.start('EndScene')
  }

  //Test code related to buttons
  private checkOverlap(button: Button, sprite: Phaser.Physics.Arcade.Sprite) {
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
    } else if (this.cursors?.down.isDown) {
      this.player1?.setVelocityY(400);
      this.player1?.anims.play('turn', true)
      this.player2?.setVelocityY(400);
      this.player2?.anims.play('turn', true)
    } else {
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

    for (let i = 0; i < this.buttonArray.length; i++) {
      if (this.checkOverlap(this.buttonArray[i], this.player1!) == false && this.checkOverlap(this.buttonArray[i], this.player2!) == false) {
        this.gateArray[this.buttonArray[i].gateID].actives[this.buttonArray[i].buttonID] = false;
        this.buttonArray[i].setTexture("button")
      }
    }

    for (let i = 0; i < this.buttonArrayT.length; i++) {
      if (this.checkOverlap(this.buttonArrayT[i], this.player1!) == false && this.checkOverlap(this.buttonArrayT[i], this.player2!) == false) {
        this.gateArray[this.buttonArrayT[i].gateID].actives[this.buttonArrayT[i].buttonID] = false;
        this.buttonArrayT[i].setTexture("button")
      }
    }
    console.log(413, this.gateArray[2].body?.enable);
    if (!this.gateArray[2].body?.enable) {
      this.nextScene?.setVisible(true)
      this.nextScene2?.setVisible(true)
    }
  }

}