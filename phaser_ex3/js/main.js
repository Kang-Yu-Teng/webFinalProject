var game;
var gameWidth = 320;
var gameHeight = 240;

window.onload = function() {
	game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "");
	game.state.add('Boot', boot);
	// game.state.add('Preload', preload);
	// game.state.add('TitleScreen', titleScreen);
	// game.state.add('PlayGame', playGame);
	// game.state.add('GameOver', gameOver);

	game.state.start("Boot");
}


