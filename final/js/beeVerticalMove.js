module.exports = function () {
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