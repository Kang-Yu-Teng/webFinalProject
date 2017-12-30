var Slug = function (game, x, y) {
    // x *= 16;
    // y *= 16;
    Phaser.Sprite.call(this, game, x, y, "atlas", "slug/slug-1");
    this.animations.add('crawl', Phaser.Animation.generateFrameNames('slug/slug-', 1, 4, '', 0), 10, true);
    this.animations.play("crawl");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(20, 11, 7, 10);
    this.body.gravity.y = 500;
    this.speed = 40;
    this.body.velocity.x = this.speed;
    this.body.bounce.x = 1;
    this.kind = "slug";

}
Slug.prototype = Object.create(Phaser.Sprite.prototype);
Slug.prototype.constructor = Slug;
Slug.prototype.update = function () {
    if (this.body.velocity.x < 0) {
        this.scale.x = 1;

    } else {
        this.scale.x = -1;

    }
}
Slug.prototype.turnAround = function () {
    if (this.body.velocity.x > 0) {
        this.body.velocity.x = -this.speed;
        this.x -= 5;
    } else {
        this.body.velocity.x = this.speed;
        this.x += 5;
    }

}

module.exports = Slug;