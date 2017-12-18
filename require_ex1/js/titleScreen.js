module.exports = 'titleScreen';
var titleScreen = function (game) {};
titleScreen.prototype = {
    create: function () {
        //TileSprite	A Game Object with a repeating texture that can be scrolled and scaled.
        //(x, y, width, height, key)
        background = game.add.tileSprite(0, 0, gameWidth, gameHeight, "background");
        middleground = game.add.tileSprite(0, 0, gameWidth, gameHeight, "middleground");
        this.title = game.add.image(game.width / 2, 130, "title");
        this.title.anchor.setTo(0.5, 1);
        //
        this.pressEnter = game.add.image(game.width / 2, game.height - 35, "enter");
        this.pressEnter.anchor.setTo(0.5);
        //
        //取得enter鍵
        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        //按下時觸發事件
        startKey.onDown.add(this.startGame, this);
        //
        //初始設定state=1
        this.state = 1;
        //
        //以指定的時間間隔重複調動指定函式
        game.time.events.loop(700, this.blinkText, this);
        //
        var credits = game.add.image(game.width / 2, game.height - 15, "credits");
        credits.anchor.setTo(0.5);
    },
    startGame: function () {
        if (this.state == 1) {
            this.state = 2;
            this.title2 = game.add.image(game.width / 2, game.height / 2, 'instructions');
            this.title2.anchor.setTo(0.5);
            this.title.destroy();
        } else {
            this.game.state.start('playGame');
        }
    },
    blinkText: function () {
        //alpha屬性設定透明於否
        if (this.pressEnter.alpha == 1) {
            this.pressEnter.alpha = 0;
        } else {
            this.pressEnter.alpha = 1;
        }
    },
    update: function () {
        //在update函式中更新捲動
        //以下設定等同於每禎的位移量px
        background.tilePosition.x -= 0.25;
        middleground.tilePosition.x -= 0.4;
    }
}