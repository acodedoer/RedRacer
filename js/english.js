var english = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

function english ()
{
    Phaser.Scene.call(this, {key: 'english' });
},
init: function(){
    
},

create: function ()
{
    console.log(this)
    this.classifier = ml5.soundClassifier("SpeechCommands18w", { probabilityThreshold: 0.7 })
    this.classifier.classify(this.classifySound);
    this.started = false;
    this.msg1
    this.msg2
    this.playing = true;
    this.score = 0;
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
    this.msg1 = this.add.text(window.innerWidth/2, window.innerHeight/2 - 20,'Say "LEFT" to move player right or say "RIGHT" to move player right.', {fontFamily: 'rockwell', color:"#c73e1d",fontSize: 80 * this.game.global.scaler}).setOrigin(0.5, 1).setAlign('center').setWordWrapWidth(1200*this.game.global.scaler);
    this.msg2 = this.add.text(window.innerWidth/2, window.innerHeight/1.8,'Say "Yes" to begin.', {fontFamily: 'rockwell', color:"#000000",fontSize: 80 * this.game.global.scaler}).setOrigin(0.5,0).setAlign('center').setWordWrapWidth(1200*this.game.global.scaler);
},

start: function(){
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

classifySound: function(error, results) {
    if(this.game.scene.keys.english.playing == true){
        if (error) {
            console.error(error);
            return
        }
        console.log(results)
        if(this.game.scene.keys.english.started == true){
            if(results[0].confidence>0.75){
                if(results[0].label=="right"){
                    this.game.scene.keys.english.red.x = window.innerWidth/2 + (this.game.global.scaler*200);
                }
                else if(results[0].label=="left"){
                    this.game.scene.keys.english.red.x = window.innerWidth/2 - (this.game.global.scaler*200)
                }
            }
        }
        else{
            if(results[0].confidence>0.75 && results[0].label=="yes"){
                this.game.scene.keys.english.start()
                this.game.scene.keys.english.started = true
                this.game.scene.keys.english.msg1.destroy()
                this.game.scene.keys.english.msg2.destroy()
            }
        }
    }
},

gameOver: function(){
    window.localStorage.setItem('score', this.score);
    if(window.localStorage.getItem('englishbest')<=this.score){
        window.localStorage.setItem('englishbest', this.score);
    };
    this.playing=false;
    this.scene.start('englishgameover')
}
});