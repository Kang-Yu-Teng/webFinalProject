Player = function (game, x, y) {
    x *= 16;
    y *= 16;
    this.initX = x;
    this.initY = y;
    this.health = 3;
    //針對梯子上的狀態
    this.onLadder = false;
    //
    Phaser.Sprite.call(this, game, x, y, "atlas", "player-idle/player-idle-1");

    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 300;
    //
    this.body.setSize(12, 26, 10, 6);

    //add animations
    //
    var animVel = 12;
    this.animations.add('idle', Phaser.Animation.generateFrameNames('player-idle/player-idle-', 1, 9, '', 0), animVel, true);
    this.animations.add('skip', Phaser.Animation.generateFrameNames('player-skip/player-skip-', 1, 8, '', 0), animVel, true);
    this.animations.add('jump', Phaser.Animation.generateFrameNames('player-jump/player-jump-', 1, 4, '', 0), animVel, true);
    this.animations.add('fall', Phaser.Animation.generateFrameNames('player-fall/player-fall-', 1, 4, '', 0), animVel, true);
    this.animations.add('duck', Phaser.Animation.generateFrameNames('player-duck/player-duck-', 1, 4, '', 0), animVel, true);
    this.animations.add('hurt', Phaser.Animation.generateFrameNames('player-hurt/player-hurt-', 1, 2, '', 0), animVel, true);
    this.animations.add('climb', Phaser.Animation.generateFrameNames('player-climb/player-climb-', 1, 4, '', 0), animVel, true);
    this.animations.play("idle");
    this.kind = "player";
    //將此物件指定給唯一一名的玩家
    player = this;
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    if (this.onLadder) {
        this.body.gravity.y = 0;
    } else {
        this.body.gravity.y = 300;
    }
    this.onLadder = false;

}
Player.prototype.reset = function () {
    this.x = this.initX;
    this.y = this.initY;
    this.health = 3;
    this.body.velocity.y = 0;
    this.alive = true;
    this.animations.play('idle');
    hurtFlag = false;

}
Player.prototype.death = function () {
    this.alive = false;
    this.body.velocity.x = 0;
    this.body.velocity.y = -400;
}

module.exports = Player;