var preload = function(game){
};
preload.prototype = {
	preload: function(){
		var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");//x,y,key
		loadingBar.anchor.setTo(0.5,0.5);//把按鈕的錨點x,y設在中心

		// Set a Sprite to be a "preload" sprite by passing it to this method.
		// A "preload" sprite will have its width or height crop adjusted based on the percentage of the loader in real-time.
		// This allows you to easily make loading bars for games.
		// The sprite will automatically be made visible when calling this.
		game.load.setPreloadSprite(loadingBar);
		
		// load title screen
		game.load.image("title", "assets/sprites/title-screen.png");
		game.load.image("enter", "assets/sprites/press-enter-text.png");
		game.load.image("credits", "assets/sprites/credits-text.png");
		game.load.image("instructions", "assets/sprites/instructions.png");
		game.load.image("gameover", "assets/sprites/game-over.png");
		// environment
		game.load.image("background", "assets/environment/background.png");
		game.load.image("middleground", "assets/environment/middleground.png");
		// tileset
		game.load.image("tileset", "assets/environment/tileset.png");
		game.load.image("collisions", "assets/environment/collisions.png");
		game.load.tilemap("map", "assets/maps/map.json", null, Phaser.Tilemap.TILED_JSON);
		// atlas
		game.load.atlasJSONArray("atlas", "assets/atlas/atlas.png", "assets/atlas/atlas.json");
		game.load.atlasJSONArray("atlas-props", "assets/atlas/atlas-props.png", "assets/atlas/atlas-props.json");
		// audio
		game.load.audio("music", ["assets/sound/enchanted_forest_loop.ogg", "assets/sound/enchanted_forest.mp3"]);
		game.load.audio("carrot", ["assets/sound/carrot.ogg", "assets/sound/carrot.mp3"]);
		game.load.audio("enemy-death", ["assets/sound/enemy-death.ogg", "assets/sound/enemy-death.mp3"]);
		game.load.audio("hurt", ["assets/sound/hurt.ogg", "assets/sound/hurt.mp3"]);
		game.load.audio("jump", ["assets/sound/jump.ogg", "assets/sound/jump.mp3"]);
		game.load.audio("star", ["assets/sound/star.ogg", "assets/sound/star.mp3"]);
		game.load.audio("chest", ["assets/sound/chest.ogg", "assets/sound/chest.mp3"]);
	},
	create: function(){
		this.game.state.start("titleScreen");
	}
}
