var Star = function (game, x, y) {
    x *= 16;
    y *= 16;
    this.able = false;
    this.bounceCount = 0;
    Phaser.Sprite.call(this, game, x, y, "atlas", "star/star-1");
    this.animations.add('spin', Phaser.Animation.generateFrameNames('star/star-', 1, 4, '', 0), 10, true);
    this.animations.play("spin");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);

    this.body.velocity.y = game.rnd.realInRange(150, 220);
    this.body.velocity.x = game.rnd.realInRange(-30, 31);
    this.body.drag.set(10);
    this.body.bounce.set(0.8);
    this.body.gravity.y = 500;

    this.kind = "star";

}
Star.prototype = Object.create(Phaser.Sprite.prototype);
Star.prototype.constructor = Star;
Star.prototype.update = function () {

    if (this.body.onFloor()) {
        this.bounceCount++;

    }
    if (this.bounceCount >= 3) {
        this.able = true;
    }
}

module.exports = Star;