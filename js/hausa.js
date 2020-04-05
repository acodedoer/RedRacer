var hausa = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

function hausa ()
{
    Phaser.Scene.call(this, {key: 'hausa' });
},

create: function ()
{
    let soundModel = 'https://teachablemachine.withgoogle.com/models/upFRpPFfd/';
    this.classifier = ml5.soundClassifier(soundModel + 'model.json');
    this.classifier.classify(this.classifyHausa);
    this.started = false;
    this.msg1
    this.msg2
    this.score = 0;
    this.playing=true;
    this.score_text = this.add.text(window.innerWidth/2, 5, '0', {fontFamily: 'rockwell', color:"#c73e1d",fontSize: 120 * this.game.global.scaler}).setOrigin(0.5,0).setAlign('center');
    this.score_text.visible = false;
    this.getReady()
},

keepScore: function(){
    this.score+=1;
    this.score_text.setText(this.score)
    this.time.delayedCall(1000, this.keepScore, [], this);
},

getReady: function(){
    this.msg = this.add.text(window.innerWidth/2, window.innerHeight/2 - 20,'Yi amfani da kalmomin "DAMA" da "HAGU" domin kaucewa hatsari', {fontFamily: 'rockwell', color:"#c73e1d",fontSize: 100 * this.game.global.scaler}).setOrigin(0.5, 1).setAlign('center').setWordWrapWidth(1200*this.game.global.scaler);
    this.time.delayedCall(3000, this.start, [], this);},

start: function(){
    this.msg.destroy();
    this.red = this.physics.add.image(window.innerWidth/2 - (this.game.global.scaler*200), window.innerHeight * 11/12, 'red').setOrigin(0.5,1).setScale(this.game.global.scaler);
    this.red.setCollideWorldBounds(true);
    this.createEnemy()
    this.createWall()
    this.score_text.visible = true;
    this.keepScore()
},

createWall: function(){
    new WallRight({scene:this}).setScale(this.game.global.scaler);
    new WallLeft({scene:this}).setScale(this.game.global.scaler);
    this.time.delayedCall(1500, this.createWall, [], this)
},

createEnemy: function(){
    let pos
    if(Math.floor(Math.random()*10)%2==0){
        pos = window.innerWidth/2 - (this.game.global.scaler*200);
    }
    else{
        pos= window.innerWidth/2 + (this.game.global.scaler*200);
    }
    let enemy = this.physics.add.image(pos, 0 * 11/12, 'black').setOrigin(0.5,1).setScale(this.game.global.scaler);
    let tween = this.tweens.add({
        targets: enemy,
        y: window.innerHeight*2,
        delay: 0,
        duration: 12000,
        ease: 'linear'
    });

    this.physics.add.overlap(enemy, this.red, this.gameOver.bind(this));
    this.time.delayedCall(8000, this.die, [enemy], this)
    this.time.delayedCall(4000, this.createEnemy, [], this)
},

die: function(obj){
    obj.destroy()
},

classifyHausa: function(error, results) {
    if(this.game.scene.keys.hausa.playing == true){
        if (error) {
            console.error(error);
            return
        }
        console.log(results)
        if(results[0].confidence>0.75){
            if(results[0].label=="dama"){
                this.game.scene.keys.hausa.red.x = window.innerWidth/2 + (this.game.global.scaler*200);
            }
            else if(results[0].label=="hagu"){
                this.game.scene.keys.hausa.red.x = window.innerWidth/2 - (this.game.global.scaler*200)
            }
        }
    }
},

gameOver: function(){
    window.localStorage.setItem('score', this.score);
    if(window.localStorage.getItem('hausabest')<=this.score){
        window.localStorage.setItem('hausabest', this.score);
    };
    this.playing=false;
    this.classifier.classify(function(){})
    this.scene.start('hausagameover')
}
});