// module.exports = 'bee';
var Bee = function (game, x, y, distance, horizontal) {

    // Enemy.apply(this);
    // Enemy.call(this);

    x *= 16;
    y *= 16;

    Phaser.Sprite.call(this, game, x, y, "atlas", "bee/bee-1");
    this.animations.add('fly', Phaser.Animation.generateFrameNames('bee/bee-', 1, 8, '', 0), 15, true);
    this.animations.play("fly");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(15, 18, 11, 13);
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

// plant

Plant = function (game, x, y) {
    x *= 16;
    y *= 16;

    Phaser.Sprite.call(this, game, x, y, "atlas", "piranha-plant/piranha-plant-1");
    this.animations.add('idle', Phaser.Animation.generateFrameNames('piranha-plant/piranha-plant-', 1, 5, '', 0), 10, true);
    this.animations.add('attack', Phaser.Animation.generateFrameNames('piranha-plant-attack/piranha-plant-attack-', 1, 4, '', 0), 10, true);
    this.animations.play("idle");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 500;
    //this.body.setSize(18, 29, 21, 16);
    this.body.setSize(61, 29, 0, 16);
}
Plant.prototype = Object.create(Phaser.Sprite.prototype);
Plant.prototype.constructor = Plant;
Plant.prototype.update = function () {

    if (this.x > player.x) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;

    }

    var distance = game.physics.arcade.distanceBetween(this, player);

    if (distance < 65) {
        this.animations.play("attack");

    } else {
        this.animations.play("idle");
    }

}

// module.exports = bee;