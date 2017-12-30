module.exports = function () {
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