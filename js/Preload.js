var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.spritesheet('ant', 'assets/img/ant.png', 16, 16, 4);
    this.load.spritesheet('dirt', 'assets/img/dirt.png', 16, 16, 10);    
  },
  create: function() {
    this.state.start('Game');
  }
};
