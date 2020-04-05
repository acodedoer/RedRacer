var preload = new Phaser.Class({

    Extends: Phaser.Scene,

//function that loads assests
preload: function  ()
    {
        this.load.image('wall', 'assets/wall.png')
        this.load.image('red', 'assets/red.png')
        this.load.image('black', 'assets/black.png')
        this.load.image('large', 'assets/large_board.png')
        this.load.image('regular', 'assets/regular_board.png')
        this.load.image('cat', 'assets/cat.png')
        this.load.image('twitter', 'assets/twitter.png')
    },
create: function(){
    window.localStorage.setItem('score', 0);
    this.scene.start('splashscreen')
}
});