window.onload = function() {
	game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "");
	game.state.add('animationTest', animationTest);

	game.state.start("animationTest");
}


