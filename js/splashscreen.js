var splashscreen = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

function splashscreen ()
{
    Phaser.Scene.call(this, {key: 'splashscreen' });
},

create: function ()
{
    this.add.image(window.innerWidth/2, window.innerHeight/2,'large').setOrigin(0.5).setScale(this.game.global.scaler)
    this.add.text(window.innerWidth/2, window.innerHeight/2,'RedRacer', {fontFamily: 'rockwell', color:"#c73e1d",fontSize: 200 * this.game.global.scaler}).setOrigin(0.5).setAlign('center');
    this.time.delayedCall(2000, this.start, [], this)
},

start:function(){
    this.scene.start('menu')
}
  
});