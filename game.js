export class Game extends Phaser.Scene{

  constructor(){
    super({key: 'game'});
  }
  

  preload(){
    this.load.image('background', './images/background.jpg');
    this.load.image('gameOver', './images/gameOver.png');
    this.load.image('platform', './images/platform.png');
    this.load.image('ball', './images/ball.png');
  }

  create(){
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.add.image(400, 300, 'background');
    this.gameOverImage = this.add.image(400, 300, 'gameOver');
    this.gameOverImage.visible = false;

    this.platform = this.physics.add.image(400, 550, 'platform').setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);

    this.ball = this.physics.add.image(400, 0, 'ball');
    this.ball.setCollideWorldBounds(true);

    let velocity = 100 * Phaser.Math.Between(1.3, 2);
    if(Phaser.Math.Between(0, 10) > 5){
      velocity = 0 - velocity;
    }
    this.ball.setVelocity(velocity, 10);

    this.physics.add.collider(this.ball, this.platform);
    this.ball.setBounce(1.01);

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update(){
    if(this.cursors.left.isDown){
      this.platform.setVelocityX(-500);
    }
    else if(this.cursors.right.isDown){
      this.platform.setVelocityX(500);
    }
    else{
      this.platform.setVelocityX(0);
    }
    if(this.ball.y >650){
      console.log('fin');
      this.gameOverImage.visible = true;
      this.platform.visible = false;
      this.scene.pause();
    }
  }


}