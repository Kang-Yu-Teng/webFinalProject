var Target = require("./bee.js");
module.exports = function (x, y, args, group) {
	var temp;
	if (args == null) {
		temp = new Target(game, x, y, 0, true);
	} else {
		temp = new Target(game, x, y, args.distance, args.horizonta);
	}
	game.add.existing(temp);

	// enemies_group.add(temp);
	if (group != null) {
		group.add(temp);
	}
}