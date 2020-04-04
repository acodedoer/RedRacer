let config = {
    type: Phaser.AUTO, 
    width: window.innerWidth, 
    height: window.innerHeight, 
    backgroundColor: '#F7F7F7', 
    scene: [preload, main]
}

game = new Phaser.Game(config);

let scaler;
if(window.innerWidth>window.innerHeight){
    scaler=window.innerHeight/2560;
}
else{
    scaler=window.innerWidth/1440;
}

game.global = {scaler: scaler}