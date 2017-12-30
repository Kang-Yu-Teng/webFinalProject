var Bee = function (game, x, y, distance, horizontal) {

    // Enemy.apply(this);
    // Enemy.call(this);

    // x *= 16;
    // y *= 16;

    Phaser.Sprite.call(this, game, x, y, "atlas", "bee/bee-1");
    this.animations.add('fly', Phaser.Animation.generateFrameNames('bee/bee-', 1, 8, '', 0), 15, true);
    this.animations.play("fly");
    this.anchor.setTo(0.5);

    game.physics.arcade.enable(this);
    //設定物理大小，寬 高 x偏移 y偏移
    this.body.setSize(20, 20, 11, 13);
    this.initX = this.x;
    this.initY = this.y;
    this.distance = distance;
    this.speed = 40;
    this.horizontal = horizontal;
    if (this.horizontal) {
        this.body.velocity.x = this.speed;
        this.body.velocity.y = 0;
    } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = this.speed;
    }

}
Bee.prototype = Object.create(Phaser.Sprite.prototype);
Bee.prototype.constructor = Bee;
Bee.prototype.update = function () {
    if (this.horizontal) {
        this.horizontalMove();
    } else {
        this.verticalMove();
    }

}
Bee.prototype.verticalMove = function () {
    if (this.body.velocity.y > 0 && this.y > this.initY + this.distance) {
        this.body.velocity.y = -40;
    } else if (this.body.velocity.y < 0 && this.y < this.initY - this.distance) {
        this.body.velocity.y = 40;
    }
    if (this.x > player.x) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }
}
Bee.prototype.horizontalMove = function () {
    if (this.body.velocity.x > 0 && this.x > this.initX + this.distance) {
        this.body.velocity.x = -40;
    } else if (this.body.velocity.x < 0 && this.x < this.initX - this.distance) {
        this.body.velocity.x = 40;
    }
    if (this.body.velocity.x < 0) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }
}



module.exports = Bee;