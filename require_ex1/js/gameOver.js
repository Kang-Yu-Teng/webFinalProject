module.exports = 'gameOver';
var gameOver = function (game) {};
gameOver.prototype = {
    create: function () {
        background = game.add.tileSprite(0, 0, gameWidth, gameHeight, "background");
        middleground = game.add.tileSprite(0, 0, gameWidth, gameHeight, "middleground");
        this.title = game.add.image(game.width / 2, game.height / 2, 'gameover');
        this.title.anchor.setTo(0.5);
        //
        this.pressEnter = game.add.image(game.width / 2, game.height - 35, "enter");
        this.pressEnter.anchor.setTo(0.5);
        //
        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        startKey.onDown.add(this.startGame, this);
        //
        game.time.events.loop(700, this.blinkText, this);
        //
        var credits = game.add.image(game.width / 2, game.height - 15, "credits");
        credits.anchor.setTo(0.5);
    },
    startGame: function () {
        this.game.state.start('titleScreen');
    },
    blinkText: function () {
        if (this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else {
            this.pressEnter.alpha = 1;
        }
    },
    update: function () {
        background.tilePosition.x -= 0.25;
        middleground.tilePosition.x -= 0.4;
    }

}