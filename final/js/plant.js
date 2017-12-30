// plant

var Plant = function (game, x, y) {
	// x *= 16;
	// y *= 16;

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

module.exports = Plant;