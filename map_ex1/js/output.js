/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// require('phaser');
var boot = __webpack_require__(1);
var preload = __webpack_require__(2);
var titleScreen = __webpack_require__(3);
var playGame = __webpack_require__(4);
var gameOver = __webpack_require__(12);
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// module.exports = function (game) {};


var boot = function (game) {};

//prototype代表說以此function:boot 所建立的物件都有prototype內的屬性 
boot.prototype = {
	preload: function () {
		this.game.load.image("loading", "assets/sprites/loading.png");
	},
	create: function () {
		//have the game centered horizontally
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		//scaling
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.renderer.renderSession.roundPixels = true; //模糊關閉，精靈對象的呈現使用整數位置，如果false則會在像素間嘗試呈現而模糊

		this.game.state.start("preload");
	}
}
module.exports = boot;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var preload = function (game) {};
preload.prototype = {
	preload: function () {
		var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading"); //x,y,key
		loadingBar.anchor.setTo(0.5, 0.5); //把按鈕的錨點x,y設在中心

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
		// load and game screen
		game.load.image("gameover", "assets/sprites/game-over.png");
		// environment
		game.load.image("background", "assets/environment/background.png");
		game.load.image("middleground", "assets/environment/middleground.png");
		game.load.image("collisions", "assets/environment/collisions.png");

		//map
		game.load.image("tileset", "assets/environment/tileset.png");
		game.load.tilemap("map", "assets/maps/test.json", null, Phaser.Tilemap.TILED_JSON);
		//

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
	create: function () {
		this.game.state.start("titleScreen");
	}
}

module.exports = preload;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
module.exports = titleScreen;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Player = __webpack_require__(5);
var Bee = __webpack_require__(6);
var Plant = __webpack_require__(7);
var Slug = __webpack_require__(8);
var Chest = __webpack_require__(9);
var Star = __webpack_require__(10);
var EnemyDeath = __webpack_require__(11);

var playGame = function (game) {};
playGame.prototype = {
    var: lv = 1,
    create: function () {
        //建立背景
        this.createBackground();
        //循環背景音樂
        this.startMusic();
        //加入音效
        this.addAudios();
        //建立地圖磚
        this.createTileMap(lv);
        //增添裝飾用景物
        // this.decorWorld();
        //添加裝飾用景物，應該是前景
        // this.decorWorldFront();
        //添加群組
        this.createGroups();
        //綁定按鍵
        this.bindKeys();
        //建立玩家
        this.createPlayer(2, 9);
        //建立星星
        // this.createStars();
        //建立蘿蔔
        // this.createCarrots();
        //設定相機跟隨對象
        this.camFollow(player);
        //生成hud(血條物件)
        this.createHud();
        //生成物件群
        // this.populate();

    },
    update: function () {
        // physics
        //添加碰撞關係
        game.physics.arcade.collide(enemies_group, this.layer_collisions);
        game.physics.arcade.collide(chests_group, this.layer_collisions);
        game.physics.arcade.collide(loot_group, this.layer_collisions);

        //對存活狀態的角色做各種邏輯檢測
        if (player.alive) {
            //physics
            game.physics.arcade.collide(player, this.layer_collisions);
            //overlaps
            game.physics.arcade.overlap(player, enemies_group, this.checkAgainstEnemies, null, this);
            game.physics.arcade.overlap(player, carrots_group, this.collectCarrot, null, this);
            game.physics.arcade.overlap(player, stars_group, this.collectStar, null, this);
            game.physics.arcade.overlap(player, chests_group, this.checkAgainstChests, null, this);
            game.physics.arcade.overlap(player, loot_group, this.collectLoot, null, this);
        }

        //
        this.movePlayer();
        this.parallaxBg();
        this.hurtManager();
        this.deathReset();

        this.updateHealthHud();
        // this.debugGame();

    },
    movePlayer: function () {
        if (!player.alive) {
            player.animations.play("hurt");
            return;
        }

        if (hurtFlag) {
            player.animations.play("hurt");
            return;
        }

        if (player.onLadder) {
            player.animations.play("climb");

            var vel = 30;
            if (this.wasd.duck.isDown) {
                player.body.velocity.y = vel;
            } else if (this.wasd.up.isDown) {
                player.body.velocity.y = -vel;
            }

            //horizontal

            if (this.wasd.left.isDown) {
                player.body.velocity.x = -vel;

                player.scale.x = -1;
            } else if (this.wasd.right.isDown) {
                player.body.velocity.x = vel;

                player.scale.x = 1;
            } else {
                player.body.velocity.x = 0;

            }

            return;
        }

        if (this.wasd.jump.isDown && player.body.onFloor()) {
            player.body.velocity.y = -200;
            this.audioJump.play();

        }

        var vel = 80;
        if (this.wasd.left.isDown) {
            player.body.velocity.x = -vel;
            this.moveAnimation();
            player.scale.x = -1;
        } else if (this.wasd.right.isDown) {
            player.body.velocity.x = vel;
            this.moveAnimation();
            player.scale.x = 1;
        } else {
            player.body.velocity.x = 0;
            this.stillAnimation();

        }
    },
    hurtManager: function () {
        if (hurtFlag && this.game.time.totalElapsedSeconds() > 0.3) {
            hurtFlag = false;
        }
    },
    parallaxBg: function () {
        background.tilePosition.x = this.layer.x * -0.2;
        middleground.tilePosition.x = this.layer.x * -0.5;
    },
    deathReset: function () {
        if (player.y > 16 * 60) {
            // player.reset();
            this.music.stop();
            this.game.state.start("gameOver");
        }
    },
    hurtPlayer: function () {

        if (hurtFlag) {
            return;
        }
        hurtFlag = true;
        this.game.time.reset();

        player.animations.play("hurt");
        player.y -= 5;

        player.body.velocity.y = -150;
        player.body.velocity.x = (player.scale.x == 1) ? -22 : 22;
        player.health--;

        this.audioHurt.play();
        if (player.health < 1) {
            player.death();

        }
    },
    moveAnimation: function () {
        if (player.body.velocity.y < 0) {
            player.animations.play("jump");
        } else if (player.body.velocity.y > 0) {
            player.animations.play("fall");
        } else {
            player.animations.play("skip");
        }
    },
    stillAnimation: function () {
        if (player.body.velocity.y < 0) {
            player.animations.play("jump");
        } else if (player.body.velocity.y > 0) {
            player.animations.play("fall");
        } else if (this.wasd.duck.isDown) {
            player.animations.play("duck");
        } else {
            player.animations.play("idle");
        }
    },
    createBackground: function () {
        background = game.add.tileSprite(0, 0, gameWidth, gameHeight, "background");
        middleground = game.add.tileSprite(0, 0, gameWidth, gameHeight, "middleground");

        //設置為固定在camera的特定位置
        //不是真得完全不能再動，而是和camera同步
        //可以再對他設置tween之類的動畫屬性
        background.fixedToCamera = true;
        middleground.fixedToCamera = true;
    },
    startMusic: function () {
        if (!audioFlag) {
            return
        }

        this.music = game.add.audio("music");
        this.music.loop = true;

        this.music.play();

    },
    addAudios: function () {
        this.audioCarrot = game.add.audio("carrot");
        this.audioEnemyDeath = game.add.audio("enemy-death");
        this.audioHurt = game.add.audio("hurt");
        this.audioJump = game.add.audio("jump");
        this.audioStar = game.add.audio("star");
        this.audioChest = game.add.audio("chest");
    },
    createTileMap: function (levelNum) {
        if (levelNum == 1) {
            levelNum = "";
        }

        //tilemap
        //選擇地圖（應該是由相關地圖編輯器生成）
        //tilemap那個參數是給當時load時指定出的名字，不是檔名
        globalMap = game.add.tilemap("map" + levelNum);
        //設置磚圖，應該對應當初編輯地圖時所使用的原始圖檔
        globalMap.addTilesetImage("sunny-land", "tileset");

        //建立圖層
        //注意，那個層名要對應在tiled內設定的層名

        this.layer = globalMap.createLayer("touched");


        // collisions
        //根據陣列磚類設置碰撞磚，磚類在Tiled編輯器中能看到ID
        // globalMap.setCollision([1]);
        globalMap.setCollision(collisionTiledID);

        //位所有磚類=2的設置上側碰撞(此為自訂函式)
        this.setTopCollisionTiles(ladderTopID);

        // specific tiles for enemies
        //設置對應磚類而碰撞觸發的函式
        // globalMap.setTileIndexCallback(3, this.enemyCollide, this);
        globalMap.setTileIndexCallback(ladderID, this.triggerLadder, this);
        globalMap.setTileIndexCallback(ladderTopID, this.triggerLadder, this);
        globalMap.setTileIndexCallback(deadBlockID, this.killZone, this);
        // globalMap.setTileIndexCallback(8, this.exitZone, this);

        //Sets the world size to match the size of this layer.
        this.layer.resizeWorld();
        // this.layer_collisions.resizeWorld();

    },
    //為glovalMap的範圍內所有磚塊為所有等於titleIndex設置上側碰撞
    setTopCollisionTiles: function (tileIndex) {
        var x, y, tile;
        for (x = 0; x < globalMap.width; x++) {
            for (y = 1; y < globalMap.height; y++) {
                tile = globalMap.getTile(x, y);
                if (tile !== null) {
                    //判斷陣列或是一般值後開始設定對應的ID
                    if (Array.isArray(tileIndex) == true) {
                        tileIndex.every(
                            function (value, index, array) {
                                if (tile.index == value) {
                                    tile.setCollision(false, false, true, false);
                                }
                            }
                        );
                    } else {
                        if (tile.index == tileIndex) {
                            tile.setCollision(false, false, true, false);
                        }
                    }
                }
            }
        }
    },
    decorWorld: function () {
        this.addProp(1, 0.2, 'tree');
        this.addProp(11, 10.3, 'mushroom-red');
        this.addProp(3, 0, 'vine');
        this.addProp(25, 0, 'vine');
        this.addProp(17, 11, 'mushroom-brown');
        this.addProp(120, 0.2, 'tree');
        this.addProp(146, 2.7, 'house');

        this.addProp(130, 0, 'vine');
        this.addProp(136, 0, 'vine');

        this.addProp(144, 11.3, 'mushroom-red');

        this.addProp(140, 11.3, 'mushroom-brown');

    },
    decorWorldFront: function () {

        this.addProp(16, 12.7, 'rock');
        this.addProp(2, 12, 'plant');
        this.addProp(23, 12, 'plant');
        this.addProp(53, 11.7, 'rock');

        this.addProp(150, 12, 'plant');
        this.addProp(152, 12, 'plant');
        this.addProp(143, 12, 'plant');
        this.addProp(119, 12, 'plant');
        this.addProp(122, 12.5, 'rock');
    },
    addProp: function (x, y, item) {
        game.add.image(x * 16, y * 16, 'atlas-props', item);
    },
    createGroups: function () {
        enemies_group = game.add.group();
        enemies_group.enableBody = true;
        //
        chests_group = game.add.group();
        chests_group.enableBody = true;
        //
        loot_group = game.add.group();
        loot_group.enableBody = true;
        //
        carrots_group = game.add.group();
        carrots_group.enableBody = true;
        //
        stars_group = game.add.group();
        stars_group.enableBody = true;
    },
    bindKeys: function () {
        this.wasd = {
            jump: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            duck: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP)
        };
        game.input.keyboard.addKeyCapture(
            [Phaser.Keyboard.SPACEBAR,
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.DOWN,
                Phaser.Keyboard.UP
            ]
        );
    },
    createPlayer: function (x, y) {
        var temp = new Player(game, x, y);
        game.add.existing(temp);
    },
    createCarrots: function () {

        globalMap.createFromObjects("Object Layer", 6, "atlas", 0, true, false, carrots_group);

        // add animation to all items
        carrots_group.callAll('animations.add', 'animations', 'spin', ['carrot/carrot-1', 'carrot/carrot-2', 'carrot/carrot-3', 'carrot/carrot-4'], 7, true);
        carrots_group.callAll('animations.play', 'animations', 'spin');

    },
    createStars: function () {

        globalMap.createFromObjects("Object Layer", 7, "atlas", 0, true, false, stars_group);
        // add animations
        stars_group.callAll("animations.add", "animations", "spin-star", ["star/star-1", "star/star-2", "star/star-3", "star/star-4", , "star/star-5", , "star/star-6"], 10, true);
        stars_group.callAll("animations.play", "animations", "spin-star");
    },
    createHud: function () {
        this.hud = game.add.sprite(10, 10, "atlas", "hud/hud-4");
        this.hud.fixedToCamera = true;

        this.scoreLabel = game.add.text(10 + 47, 11, "0", {
            font: "8px VT323",
            fill: "#ffffff"
        });
        this.scoreLabel.fixedToCamera = true;
        score = 0;

    },
    camFollow: function (target) {
        game.camera.follow(target, Phaser.Camera.FOLLOW_PLATFORMER);
    },
    collectStar: function (player, item) {
        this.increaseScore();
        item.kill();
        this.audioStar.play();

    },
    collectCarrot: function (player, item) {
        item.kill();
        this.audioCarrot.play();
        player.health++;
        if (player.health > 3) {
            player.health = 3;
        }
    },
    collectLoot: function (player, item) {
        if (item.able) {
            item.kill();
            this.audioStar.play();
            this.increaseScore();
        }

    },
    increaseScore: function () {
        score++;
        this.scoreLabel.text = score;
    },
    killZone: function (obj) {
        if (obj.kind == "player") {
            obj.death();

        }
    },
    exitZone: function (obj) {
        if (obj.kind == "player") {
            this.music.stop();
            this.game.state.start("gameOver");

        }
    },
    triggerLadder: function (obj) {
        if (obj.kind == "player" && this.wasd.up.isDown) {
            obj.onLadder = true;
        }
    },
    enemyCollide: function (obj) {
        if (obj.kind == "slug") {
            // enemy.y = 0;
            obj.turnAround();
        }

    },
    updateHealthHud: function () {
        switch (player.health) {
            case 3:
                this.hud.frameName = "hud/hud-4";
                break;
            case 2:
                this.hud.frameName = "hud/hud-3";
                break;
            case 1:
                this.hud.frameName = "hud/hud-2";
                break;
            case 0:
                this.hud.frameName = "hud/hud-1";
                break;
        }
    },
    checkAgainstEnemies: function (player, enemy) {
        if ((player.y + player.body.height * 0.5 < enemy.y) && player.body.velocity.y > 0) {

            enemy.kill();
            enemy.destroy();
            this.audioEnemyDeath.play();
            this.spawnEnemyDeath(enemy.x, enemy.y);
            player.body.velocity.y = -300;
        } else {
            this.hurtPlayer();
        }
    },
    checkAgainstChests: function (player, chest) {
        if ((player.y + player.body.height * 0.5 < chest.y) && player.body.velocity.y > 0 && !chest.opened) {
            player.body.velocity.y = -100;
            chest.open();
            this.audioChest.play();
        }
    },
    populate: function () {
        // this.spawnSlug(5, 10);
        this.spawnSlug(12, 10);
        this.spawnSlug(18, 12);
        this.spawnSlug(31, 2);
        this.spawnBee(33, 10, 20);
        this.spawnPlant(42, 10);
        this.spawnBee(48, 10, 30, true);
        this.spawnBee(60, 10, 30);
        this.spawnPlant(64, 5);

        this.spawnChest(71, 10);
        this.spawnChest(32, 21);

        this.spawnSlug(93, 21);
        this.spawnPlant(101, 20);
        this.spawnBee(111, 9, 30, true);
        this.spawnPlant(100, 7);

        this.spawnSlug(73, 21);
        this.spawnSlug(83, 21);

        this.spawnSlug(129, 11);
        this.spawnSlug(132, 11);

        this.spawnBee(142, 9, 30, false);

    },
    spawnSlug: function (x, y) {
        var temp = new Slug(game, x, y);
        game.add.existing(temp);
        enemies_group.add(temp);
    },
    spawnBee: function (x, y, distance, horizontal) {
        var temp = new Bee(game, x, y, distance, horizontal);
        game.add.existing(temp);
        enemies_group.add(temp);
    },
    spawnPlant: function (x, y) {
        var temp = new Plant(game, x, y);
        game.add.existing(temp);
        enemies_group.add(temp);
    },
    spawnChest: function (x, y) {
        var temp = new Chest(game, x, y);
        game.add.existing(temp);
        chests_group.add(temp);
    },
    spawnEnemyDeath: function (x, y) {
        var temp = new EnemyDeath(game, x, y);
        game.add.existing(temp);
    },
    enemyFactory: function () {

    }
}
module.exports = playGame;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

Player = function (game, x, y) {
    x *= 16;
    y *= 16;
    this.initX = x;
    this.initY = y;
    this.health = 3;
    //針對梯子上的狀態
    this.onLadder = false;
    //
    Phaser.Sprite.call(this, game, x, y, "atlas", "player-idle/player-idle-1");

    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 300;
    //
    this.body.setSize(12, 26, 10, 6);

    //add animations
    //
    var animVel = 12;
    this.animations.add('idle', Phaser.Animation.generateFrameNames('player-idle/player-idle-', 1, 9, '', 0), animVel, true);
    this.animations.add('skip', Phaser.Animation.generateFrameNames('player-skip/player-skip-', 1, 8, '', 0), animVel, true);
    this.animations.add('jump', Phaser.Animation.generateFrameNames('player-jump/player-jump-', 1, 4, '', 0), animVel, true);
    this.animations.add('fall', Phaser.Animation.generateFrameNames('player-fall/player-fall-', 1, 4, '', 0), animVel, true);
    this.animations.add('duck', Phaser.Animation.generateFrameNames('player-duck/player-duck-', 1, 4, '', 0), animVel, true);
    this.animations.add('hurt', Phaser.Animation.generateFrameNames('player-hurt/player-hurt-', 1, 2, '', 0), animVel, true);
    this.animations.add('climb', Phaser.Animation.generateFrameNames('player-climb/player-climb-', 1, 4, '', 0), animVel, true);
    this.animations.play("idle");
    this.kind = "player";
    //將此物件指定給唯一一名的玩家
    player = this;
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    if (this.onLadder) {
        this.body.gravity.y = 0;
    } else {
        this.body.gravity.y = 300;
    }
    this.onLadder = false;

}
Player.prototype.reset = function () {
    this.x = this.initX;
    this.y = this.initY;
    this.health = 3;
    this.body.velocity.y = 0;
    this.alive = true;
    this.animations.play('idle');
    hurtFlag = false;

}
Player.prototype.death = function () {
    this.alive = false;
    this.body.velocity.x = 0;
    this.body.velocity.y = -400;
}

module.exports = Player;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var Bee = function (game, x, y, distance, horizontal) {

    // Enemy.apply(this);
    // Enemy.call(this);

    x *= 16;
    y *= 16;

    Phaser.Sprite.call(this, game, x, y, "atlas", "bee/bee-1");
    this.animations.add('fly', Phaser.Animation.generateFrameNames('bee/bee-', 1, 8, '', 0), 15, true);
    this.animations.play("fly");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(15, 18, 11, 13);
    this.initX = this.x;
    this.initY = this.y;
    this.distance = distance;
    this.speed = 40;
    this.horizontal = horizontal;
    if (this.horizontal) {
        this.body.velocity.x = this.speed;
        this.body.velocity.y = 0;
    } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = this.speed;
    }

}
Bee.prototype = Object.create(Phaser.Sprite.prototype);
Bee.prototype.constructor = Bee;
Bee.prototype.update = function () {
    if (this.horizontal) {
        this.horizontalMove();
    } else {
        this.verticalMove();
    }

}
Bee.prototype.verticalMove = function () {
    if (this.body.velocity.y > 0 && this.y > this.initY + this.distance) {
        this.body.velocity.y = -40;
    } else if (this.body.velocity.y < 0 && this.y < this.initY - this.distance) {
        this.body.velocity.y = 40;
    }
    if (this.x > player.x) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }
}
Bee.prototype.horizontalMove = function () {
    if (this.body.velocity.x > 0 && this.x > this.initX + this.distance) {
        this.body.velocity.x = -40;
    } else if (this.body.velocity.x < 0 && this.x < this.initX - this.distance) {
        this.body.velocity.x = 40;
    }
    if (this.body.velocity.x < 0) {
        this.scale.x = 1;
    } else {
        this.scale.x = -1;
    }
}



module.exports = Bee;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// plant

Plant = function (game, x, y) {
	x *= 16;
	y *= 16;

	Phaser.Sprite.call(this, game, x, y, "atlas", "piranha-plant/piranha-plant-1");
	this.animations.add('idle', Phaser.Animation.generateFrameNames('piranha-plant/piranha-plant-', 1, 5, '', 0), 10, true);
	this.animations.add('attack', Phaser.Animation.generateFrameNames('piranha-plant-attack/piranha-plant-attack-', 1, 4, '', 0), 10, true);
	this.animations.play("idle");
	this.anchor.setTo(0.5);
	game.physics.arcade.enable(this);
	this.body.gravity.y = 500;
	//this.body.setSize(18, 29, 21, 16);
	this.body.setSize(61, 29, 0, 16);
}
Plant.prototype = Object.create(Phaser.Sprite.prototype);
Plant.prototype.constructor = Plant;
Plant.prototype.update = function () {

	if (this.x > player.x) {
		this.scale.x = 1;
	} else {
		this.scale.x = -1;

	}

	var distance = game.physics.arcade.distanceBetween(this, player);

	if (distance < 65) {
		this.animations.play("attack");

	} else {
		this.animations.play("idle");
	}

}

module.exports = Plant;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var Slug = function (game, x, y) {
    x *= 16;
    y *= 16;
    Phaser.Sprite.call(this, game, x, y, "atlas", "slug/slug-1");
    this.animations.add('crawl', Phaser.Animation.generateFrameNames('slug/slug-', 1, 4, '', 0), 10, true);
    this.animations.play("crawl");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(20, 11, 7, 10);
    this.body.gravity.y = 500;
    this.speed = 40;
    this.body.velocity.x = this.speed;
    this.body.bounce.x = 1;
    this.kind = "slug";

}
Slug.prototype = Object.create(Phaser.Sprite.prototype);
Slug.prototype.constructor = Slug;
Slug.prototype.update = function () {
    if (this.body.velocity.x < 0) {
        this.scale.x = 1;

    } else {
        this.scale.x = -1;

    }
}
Slug.prototype.turnAround = function () {
    if (this.body.velocity.x > 0) {
        this.body.velocity.x = -this.speed;
        this.x -= 5;
    } else {
        this.body.velocity.x = this.speed;
        this.x += 5;
    }

}

module.exports = Slug;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

Chest = function (game, x, y, audioChest) {
    x *= 16;
    y *= 16;
    this.opened = false;
    Phaser.Sprite.call(this, game, x, y, "atlas", "chest/chest-1");
    this.animations.add('open', ["chest/chest-2"], 0, false);

    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(19, 12, 9, 13);
    this.body.gravity.y = 500;
    this.kind = "chest";

}
Chest.prototype = Object.create(Phaser.Sprite.prototype);
// Chest.prototype.constructor = Slug;
Chest.prototype.constructor = Chest;
Chest.prototype.open = function () {
    this.opened = true;
    this.animations.play("open");

    //spawn stars
    for (var i = 0; i <= 5; i++) {
        var temp = new Star(game, this.x / 16, (this.y - 15) / 16);
        game.add.existing(temp);
        loot_group.add(temp);
    }

}

module.exports = Chest;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

Star = function (game, x, y) {
    x *= 16;
    y *= 16;
    this.able = false;
    this.bounceCount = 0;
    Phaser.Sprite.call(this, game, x, y, "atlas", "star/star-1");
    this.animations.add('spin', Phaser.Animation.generateFrameNames('star/star-', 1, 4, '', 0), 10, true);
    this.animations.play("spin");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);

    this.body.velocity.y = game.rnd.realInRange(150, 220);
    this.body.velocity.x = game.rnd.realInRange(-30, 31);
    this.body.drag.set(10);
    this.body.bounce.set(0.8);
    this.body.gravity.y = 500;

    this.kind = "star";

}
Star.prototype = Object.create(Phaser.Sprite.prototype);
Star.prototype.constructor = Star;
Star.prototype.update = function () {

    if (this.body.onFloor()) {
        this.bounceCount++;

    }
    if (this.bounceCount >= 3) {
        this.able = true;
    }
}

module.exports = Star;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

EnemyDeath = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "atlas", "enemy-death/enemy-death-1");
    this.anchor.setTo(0.5);
    var anim = this.animations.add("death", Phaser.Animation.generateFrameNames("enemy-death/enemy-death-", 1, 6, '', 0), 18, false);
    this.animations.play("death");
    anim.onComplete.add(function () {
        this.kill();
    }, this);
}

EnemyDeath.prototype = Object.create(Phaser.Sprite.prototype);
EnemyDeath.prototype.constructor = EnemyDeath;

module.exports = EnemyDeath;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

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
module.exports = gameOver;

/***/ })
/******/ ]);