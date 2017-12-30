module.exports = function (playgame) {

	var rate = 1.5;

	if (!player.alive) {
		player.animations.play("hurt");
		return;
	}

	if (hurtFlag) {
		player.animations.play("hurt");
		return;
	}

	if (player.onLadder) {
		player.animations.play("climb");

		var vel = 30 * rate;
		if (playgame.wasd.duck.isDown) {
			player.body.velocity.y = vel;
		} else if (playgame.wasd.up.isDown) {
			player.body.velocity.y = -vel;
		}

		//horizontal

		if (playgame.wasd.left.isDown) {
			player.body.velocity.x = -vel;

			player.scale.x = -1;
		} else if (playgame.wasd.right.isDown) {
			player.body.velocity.x = vel;

			player.scale.x = 1;
		} else {
			player.body.velocity.x = 0;

		}

		return;
	}

	if (playgame.wasd.jump.isDown && player.body.onFloor()) {
		player.body.velocity.y = -200;
		playgame.audioJump.play();

	}

	var vel = 80 * rate;
	if (playgame.wasd.left.isDown) {
		player.body.velocity.x = -vel;
		playgame.moveAnimation();
		player.scale.x = -1;
	} else if (playgame.wasd.right.isDown) {
		player.body.velocity.x = vel;
		playgame.moveAnimation();
		player.scale.x = 1;
	} else {
		player.body.velocity.x = 0;
		playgame.stillAnimation();

	}
}