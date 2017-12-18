window.onload = function() {
	game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "");
	game.state.add('boot', boot);
	game.state.add('preload', preload);

	game.state.add('titleScreen', titleScreen);
	game.state.add('playGame', playGame);
	game.state.add('gameOver', gameOver);

	game.state.start("boot");
}


