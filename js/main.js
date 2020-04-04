var main = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

function main ()
{
    Phaser.Scene.call(this, {key: 'main' });
},

create: function ()
{
    let soundModel = 'https://teachablemachine.withgoogle.com/models/AmZ4RpCnD/';
    this.classifier = ml5.soundClassifier(soundModel + 'model.json');
    this.classifier.classify(this.classifySound);

    this.right = window.innerWidth/2 - (this.game.global.scaler*200);
    this.left = window.innerWidth/2 + (this.game.global.scaler*200);

    this.add.image(0, 0, 'wall').setOrigin(0).setScale(this.game.global.scaler);
    this.add.image(window.innerWidth, 0, 'wall').setOrigin(1,0).setScale(this.game.global.scaler);
    this.red = this.add.image(this.right, window.innerHeight * 11/12, 'red').setOrigin(0.5,1).setScale(this.game.global.scaler);

    this.createEnemy()
},

createEnemy: function(){
    let pos
    if(Math.floor(Math.random()*10)%2==0){
        pos = this.right
    }
    else{
        pos= this.left
    }
    new Enemy({scene:this,x:pos,y:100}).setScale(this.game.global.scaler);
    this.time.delayedCall(3000, this.createEnemy, [], this)
},

classifySound: function(error, results) {
    if (error) {
        console.error(error);
        return
    }
    
    if(results[0].confidence>0.90 && results[0].label!='_background_noise_'){
        if(results[0].label=="Right"){
        this.game.scene.keys.main.red.x = this.game.scene.keys.main.left;
        }
        else if(results[0].label=="Left"){
        this.game.scene.keys.main.red.x = this.game.scene.keys.main.right;
        }
    }
}    
});