var preload = new Phaser.Class({

    Extends: Phaser.Scene,

//function that loads assests
preload: function  ()
    {
        this.load.image('wall', 'assets/wall.png')
        this.load.image('red', 'assets/red.png')
        this.load.image('black', 'assets/black.png')
    },
create: function(){
    this.scene.start('main')
}
});