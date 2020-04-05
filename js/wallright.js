class WallRight extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, window.innerWidth, 0, 'wall');
        config.scene.add.existing(this);
        this.move()
        this.scene.time.delayedCall(12000, this.die, [], this)
        this.setOrigin(1)
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