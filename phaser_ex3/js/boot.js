var boot = function() {
};

boot.prototype = {
	preload: function(){
		this.game.load.image("loading", "assets/sprites/loading.png");
	},
	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.renderer.renderSession.roundPixels = true;//模糊關閉，精靈對象的呈現使用整數位置，如果false則會在像素間嘗試呈現而模糊
		this.game.state.start("preload");
	}
}