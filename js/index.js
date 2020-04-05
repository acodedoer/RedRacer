let config = {
    type: Phaser.AUTO, 
    width: window.innerWidth, 
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: '#F7F7F7', 
    scene: [preload, splashscreen, menu, english,englishgameover, hausa, hausagameover]
}

game = new Phaser.Game(config);

let scaler;
if(window.innerWidth>window.innerHeight){
    scaler=window.innerHeight/2560;
}
else{
    scaler=window.innerWidth/1440;
}
// let soundModel = 'https://teachablemachine.withgoogle.com/models/upFRpPFfd/';
// let classifierHausa = ml5.soundClassifier(soundModel + 'model.json', { probabilityThreshold: 0.7 });
// let classifierEnglish = ml5.soundClassifier("SpeechCommands18w", { probabilityThreshold: 0.7 })


game.global = {scaler: scaler}