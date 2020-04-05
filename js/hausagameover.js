var hausagameover = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

function hausagameover ()
{
    Phaser.Scene.call(this, {key: 'hausagameover' });
},

create: function ()
{
    this.add.text(window.innerWidth/2, window.innerHeight * 1/6,'Hausa Score', {fontFamily: 'rockwell', color:"#000000",fontSize: 100 * this.game.global.scaler}).setOrigin(0.5,1).setAlign('center');
    this.add.text(window.innerWidth/2, window.innerHeight * 1/6, window.localStorage.getItem('score'), {fontFamily: 'rockwell', color:"#000000",fontSize: 500 * this.game.global.scaler}).setOrigin(0.5,0).setAlign('center');

    this.add.text(window.innerWidth/2, window.innerHeight * 3/6, "Best: "+window.localStorage.getItem('hausabest'), {fontFamily: 'rockwell', color:"#000000",fontSize: 100 * this.game.global.scaler}).setOrigin(0.5,0).setAlign('center');

    this.add.image(window.innerWidth/2, window.innerHeight * 4/6,'regular').setOrigin(0.5).setScale(this.game.global.scaler).setInteractive().on('pointerdown',function(){
        this.scene.scene.start('hausa')
    });
    this.add.text(window.innerWidth/2, window.innerHeight * 4/6,'Restart', {fontFamily: 'rockwell', color:"#c73e1d",fontSize: 100 * this.game.global.scaler}).setOrigin(0.5).setAlign('center');

    this.add.image(window.innerWidth/2, window.innerHeight * 5/6,'regular').setOrigin(0.5).setScale(this.game.global.scaler).setInteractive().on('pointerdown',function(){
        this.scene.scene.start('menu')
    });
    this.add.text(window.innerWidth/2, window.innerHeight * 5/6,'Main Menu', {fontFamily: 'rockwell', color:"#c73e1d",fontSize: 100 * this.game.global.scaler}).setOrigin(0.5).setAlign('center');

},

});