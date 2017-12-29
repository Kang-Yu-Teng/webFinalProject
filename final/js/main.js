// require('phaser');
var boot = require('./boot.js');
var preload = require('./preload.js');
var titleScreen = require('./titleScreen.js');
var playGame = require('./playGame.js');
var gameOver = require('./gameOver.js');
// require('./globalVar.js');
window.onload = function () {
	game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "");
	// console.log(boot);
	game.state.add('boot', boot);
	game.state.add('preload', preload);
	game.state.add('titleScreen', titleScreen);
	game.state.add('playGame', playGame);
	game.state.add('gameOver', gameOver);

	game.state.start("boot");
}