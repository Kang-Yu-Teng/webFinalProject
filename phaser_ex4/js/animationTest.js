var animationTest = function(game) {
};

//prototype代表說以此function:boot 所建立的物件都有prototype內的屬性 
animationTest.prototype = {
	preload: function(){
		game.load.atlas("playerIdle", "playerIdle.png","playerIdle.json");
	},
	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.renderer.renderSession.roundPixels = true;//模糊關閉，精靈對象的呈現使用整數位置，如果false則會在像素間嘗試呈現而模糊

		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'playerIdle');
		this.player.anchor.setTo(0.5,0.5);
		this.player.animations.add('playerIdle', Phaser.Animation.generateFrameNames('playerIdle', 0, 8,".png"), 14, true, false);//中間generateNames 是合成frameName用的 對應json內的名字,效果等同字串列,在尾字串後的下一個參數是以006類似這樣命名法的位數, 外面最後三個參數是每秒frame數跟是否loop是否loop 和是否使用 useNumericIndex/string

		this.player.animations.play('playerIdle');

	},
	update: function(){

	}
}