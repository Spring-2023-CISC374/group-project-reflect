import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
	private switches?: Phaser.Physics.Arcade.Group;
	private switchesA?: Phaser.Physics.Arcade.Group;
	private buttons?: Phaser.Physics.Arcade.Group;
	private platforms?: Phaser.Physics.Arcade.StaticGroup;
	private player?: Phaser.Physics.Arcade.Sprite;
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
	
	constructor() {
		super('hello-world')
	}

	preload() {
		//this.load.setBaseURL('https://labs.phaser.io')

		this.load.image('sky', 'assets/sky.png')
		this.load.image("switch", "assets/star.png");
		this.load.image("switchA", "assets/bomb.png");
		this.load.image("button", "assets/button.png");
		this.load.image("buttonA", "assets/buttonA.png");
		this.load.image("ground", "assets/platform.png");
		this.load.spritesheet("dude", "assets/dude.png",{
			frameWidth: 32, frameHeight: 48
		});
		
	}

	create() {
		//Makes sky box
		this.add.image(400, 300, 'sky');
		// Code Related to platforms
		this.platforms = this.physics.add.staticGroup()
		const ground = this.platforms.create(400,568, "ground") as Phaser.Physics.Arcade.Sprite
		ground.setScale(2)
		ground.refreshBody()
		//Add Platform(s)

		//this.platforms.create(600,400,"ground")

		//Code related to the player
		this.player = this.physics.add.sprite(100,430, "dude")
		this.player.setBounce(0.2)
		this.player.setCollideWorldBounds(true)
		this.physics.add.collider(this.player, this.platforms)

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
			frames: [{key: "dude", frame: 4 }],
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

		this.cursors = this.input.keyboard.createCursorKeys()

		//Code related to switches
		this.switches = this.physics.add.group({
			key: "switch",
			setXY: {x:240, y:450}
		})
		this.physics.add.collider(this.switches, this.platforms)
		this.physics.add.overlap(this.player, this.switches, this.handleHitSwitch, undefined, this)

		this.switchesA = this.physics.add.group({
		key: "switchA",
			setXY: {x:240, y:450}
		})
		this.physics.add.collider(this.switchesA, this.platforms)

		this.physics.add.overlap(this.switchesA, this.switches, this.handleSwitchSetup, undefined, this)
		this.physics.add.overlap(this.switchesA, this.player, this.handleHitSwitchA, undefined, this)

		this.buttons = this.physics.add.group({
			key: "button",
			setXY: {x:440, y:450}
		})
		this.physics.add.collider(this.buttons, this.platforms)
		this.physics.add.overlap(this.player, this.buttons, this.handleHitButon, undefined, this)
		
		
	}
//Handle buttons
	private handleHitButon(player: Phaser.GameObjects.GameObject, b:Phaser.GameObjects.GameObject){
			
		}
//Handle switches
private handleSwitchSetup(sA: Phaser.GameObjects.GameObject, s:Phaser.GameObjects.GameObject){
	const the_switch = sA as Phaser.Physics.Arcade.Image
	the_switch.visible = false
}

private handleHitSwitch(player: Phaser.GameObjects.GameObject, s:Phaser.GameObjects.GameObject){
	const the_switch = s as Phaser.Physics.Arcade.Image
	the_switch.disableBody(true,true)
}
private handleHitSwitchA(player: Phaser.GameObjects.GameObject, sA:Phaser.GameObjects.GameObject){
	const the_switch = sA as Phaser.Physics.Arcade.Image
	the_switch.visible = true
}


	update(){
		if(!this.cursors){
			return
		}

		if(this.cursors?.left.isDown){
			this.player?.setVelocityX(-160)
			this.player?.anims.play("left", true)
		}
		else if(this.cursors?.right.isDown){
			this.player?.setVelocityX(160)
			this.player?.anims.play("right", true)
		}
		else{
			this.player?.setVelocityX(0)
			this.player?.anims.play("turn")
		}

		if(this.cursors.up?.isDown && this.player?.body.touching.down){
			this.player.setVelocityY(-330)
		}

	}

}
