var AntGame = AntGame || {};

//Ant
AntGame.Ant = function(game) {
  this.dead = false;
  if(game)
    this.createSprite(game);
};

AntGame.Ant.prototype = {
  preload: function(game) {
    game.load.spritesheet('ant', 'assets/images/ant.png', 16, 16);
  },
  createSprite: function(game) {
    this.sprite = game.add.sprite(0, 0, 'ant');
    this.sprite.animations.add('walk', [0, 1], 10, true);
    this.sprite.animations.add('dead', [3], 1, true);
  },
  update: function(up, right, die) {
    this.sprite.body.velocity.y = -50 * up;
    this.sprite.body.velocity.x = 50 * right;

    if(up != 0 || right != 0) {
      this.sprite.play('walk');
      this.dead = false;
    } else {
      if (die) {
        this.dead = !this.dead;
      }
      if(this.dead)
        this.sprite.play('dead')
      else // reset to the walking animation (first frame)
        this.sprite.animations.stop('walk', true);
    }
  }
}


//title screen
AntGame.Game = function(){};

AntGame.Game.prototype = {
  init: function() {
  },
  preload: function() {
    // move preload outside? Way to call AntGame.Ant.preload(this) ?
    var a = new AntGame.Ant()
    a.preload(this);
  },
  create: function() {
    this.game.stage.backgroundColor = '#d2691e';
    this.player = new AntGame.Ant(this);

    this.game.physics.arcade.enable(this.player.sprite);
    //the camera will follow the player in the world
    this.game.camera.follow(this.player.sprite);

    //action keys (move player with cursor keys, space kills him)
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.die = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  update: function() {
    //collision
    //this.game.physics.arcade.collide(this.player, this.blockedLayer);
    //this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);

    //player movement
    this.player.update(
      this.cursors.up.isDown ? +1 : this.cursors.down.isDown ? -1 : 0,
      this.cursors.left.isDown ? -1 : this.cursors.right.isDown ? +1 : 0,
      this.die.isDown
    )
  },
};
