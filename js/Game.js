var AntGame = AntGame || {};

//title screen
AntGame.Game = function(){};

AntGame.Game.prototype = {
  init: function() {
  },
  preload: function() {
    this.load.spritesheet('ant', 'assets/images/ant.png', 16, 16);
  },
  create: function() {
    this.game.stage.backgroundColor = '#d2691e';
    this.player = this.game.add.sprite(0, 0, 'ant');
    this.player.animations.add('walk', [0, 1], 10, true);
    this.player.animations.add('dead', [3], 1, true);
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.dead = false;
    this.die = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function() {
    //collision
    //this.game.physics.arcade.collide(this.player, this.blockedLayer);
    //this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);

    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 50;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
    } else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
    }

    if(this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
      this.player.play('walk');
      this.dead = false;
    } else {
      if (this.die.isDown) {
        this.dead = !this.dead;
      }
      if(this.dead)
        this.player.play('dead')
      else // reset to the walking animation (first frame)
        this.player.animations.stop('walk', true);
    }
  },
};
