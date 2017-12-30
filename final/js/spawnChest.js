var Target = require("./chest.js");
module.exports = function (x, y, args, group) {
	var temp;
	temp = new Target(game, x, y);
	game.add.existing(temp);
	// enemies_group.add(temp);
	if (group != null) {
		group.add(temp);
	}
}