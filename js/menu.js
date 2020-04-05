var menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

function menu ()
{
    Phaser.Scene.call(this, {key: 'menu' });
},

create: function ()
{
    this.classifier;

    this.add.text(window.innerWidth/2, window.innerHeight * 2/8,'Select Language', {fontFamily: 'rockwell', color:"#000000",fontSize: 80 * this.game.global.scaler}).setOrigin(0.5).setAlign('center');

    let english = this.add.image(window.innerWidth/2, window.innerHeight * 3/8,'regular').setOrigin(0.5).setScale(this.game.global.scaler).setInteractive()
    this.add.text(window.innerWidth/2, window.innerHeight * 3/8,'English', {fontFamily: 'rockwell', color:"#c73e1d",fontSize: 100 * this.game.global.scaler}).setOrigin(0.5).setAlign('center');

    let hausa = this.add.image(window.innerWidth/2, window.innerHeight * 5/8,'regular').setOrigin(0.5).setScale(this.game.global.scaler).setInteractive()
    this.add.text(window.innerWidth/2, window.innerHeight * 5/8,'Hausa', {fontFamily: 'rockwell', color:"#c73e1d",fontSize: 100 * this.game.global.scaler}).setOrigin(0.5).setAlign('center');
    english.on('pointerdown',function(){
        this.scene.scene.start('english')
    });

    this.add.image(0, window.innerHeight,'twitter').setOrigin(0,1).setScale(this.game.global.scaler).setInteractive().on('pointerup', this.openTwitter, this);
    this.add.image(window.innerWidth, window.innerHeight,'cat').setOrigin(1).setScale(this.game.global.scaler).setInteractive().on('pointerup', this.openGithub, this);

    hausa.on('pointerdown',function(){
        this.scene.scene.start('hausa')
    });
},

classify: function(){

},

openTwitter: function ()
{
    var url = 'https://twitter.com/Misbahu_SZ';
    var s = window.open(url, '_blank');
    if (s && s.focus)
    {
        s.focus();
    }
    else if (!s)
    {
        window.location.href = url;
    }
},

openGithub: function ()
{
    var url = 'https://github.com/acodedoer/RedRacer';
    var s = window.open(url, '_blank');
    if (s && s.focus)
    {
        s.focus();
    }
    else if (!s)
    {
        window.location.href = url;
    }
}
});