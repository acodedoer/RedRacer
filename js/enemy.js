class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'black');
        config.scene.add.existing(this);
        this.move()
        console.log(this)
        this.scene.time.delayedCall(12000, this.die, [], this)
    }

    move(){
        let tween = this.scene.tweens.add({
            targets: this,
            y: window.innerHeight*2,
            delay: 0,
            duration: 12000,
            ease: 'linear'
        });
    }

    die(){
        this.destroy()
    }
}