var Player = require('./player.js');
var Library = require('./library.js');
new Library();

var playGame = function (game) {};
playGame.prototype = {
    // var: lv = 1,
    create: function () {
        this.lv = 1;
        //建立背景
        this.createBackground();
        //循環背景音樂
        this.startMusic();
        //加入音效
        this.addAudios();
        //建立地圖與物件
        this.createTileMap(this.lv);
        //綁定按鍵
        this.bindKeys();
        //生成hud(血條物件)
        this.createHud();
        //生成物件群
        // this.populate();

    },
    update: function () {
        // physics
        //添加碰撞關係
        // game.physics.arcade.collide(enemies_group, this.layer_touched);
        game.physics.arcade.collide(this.layer_touched, enemies_group);
        game.physics.arcade.collide(chests_group, this.layer_touched);
        game.physics.arcade.collide(loot_group, this.layer_touched);


        //對存活狀態的角色做各種邏輯檢測
        if (player.alive) {
            //physics
            game.physics.arcade.collide(this.layer_touched, player);
            // game.physics.arcade.collide(player, this.layer_collisions);
            //overlaps
            game.physics.arcade.overlap(player, enemies_group, this.checkAgainstEnemies, null, this);
            game.physics.arcade.overlap(player, carrots_group, this.collectCarrot, null, this);
            game.physics.arcade.overlap(player, stars_group, this.collectStar, null, this);
            game.physics.arcade.overlap(player, chests_group, this.checkAgainstChests, null, this);
            game.physics.arcade.overlap(player, loot_group, this.collectLoot, null, this);
        }

        //
        this.move("player", "normal");
        this.parallaxBg();
        this.hurtManager();
        this.deathReset();

        this.updateHealthHud();
        // this.debugGame();

    },
    move: function (target, method) {
        Library.move(target, method)(this);
    },
    hurtManager: function () {
        if (hurtFlag && this.game.time.totalElapsedSeconds() > 0.3) {
            hurtFlag = false;
        }
    },
    parallaxBg: function () {
        background.tilePosition.x = this.layer_touched.x * -0.2;
        middleground.tilePosition.x = this.layer_touched.x * -0.5;
    },
    deathReset: function () {
        if (player.y > 16 * 60) {
            player.reset();
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

        //依據玩家面朝方向，側向彈飛
        //plaer.scale.x是橫向縮放參數，+-互為鏡像
        if (player.scale.x == 1) {
            player.body.velocity.x = -220;
        } else if (player.scale.x == -1) {
            player.body.velocity.x = 220;
        }
        // player.body.velocity.x = (player.scale.x == 1) ? -22 : 22;

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
        globalMap.addTilesetImage("decTiled", "props");
        globalMap.addTilesetImage("sunny-land", "tileset");


        //建立圖層
        //注意，那個層名要對應在tiled內設定的層名
        //加入順序會影響顯示時的深度
        this.layer_bg = globalMap.createLayer("background");
        this.layer_mg = globalMap.createLayer("midground");
        this.layer_touched = globalMap.createLayer("touched");
        //添加群組(在此決定了群組的深度)
        this.createGroups();
        //建立星星
        this.createStars();
        //建立蘿蔔
        this.createCarrots();
        //建立玩家
        this.createPlayer(2, 9);
        //設定相機跟隨對象
        this.camFollow(player);
        //建立蜜蜂
        this.createBees();
        //建立蝸牛
        this.createSlugs();
        //建立植物
        this.createPlants();
        //建立箱子
        this.createChests();

        this.layer_fg = globalMap.createLayer("frontground");

        game.physics.arcade.enable(this.layer_touched);
        //setcollision需設於createlayer之後
        //根據陣列磚類設置碰撞磚，磚類在Tiled編輯器中能看到ID,但是該編輯器輸出時會自動+1，因此要id+1，實際以json內的值為主
        globalMap.setCollision(collisionTiledID, true, this.layer_touched);
        //位所有磚類=?的設置上側碰撞(此為自訂函式)
        //設置上碰撞和爬梯子的動作有衝突,BUG
        this.setTopCollisionTiles(ladderTopID, this.layer_touched);
        //debug test
        // this.setTopCollisionTiles(collisionTiledID, this.layer);
        // this.setTopCollisionTiles(149, this.layer);

        // specific tiles for enemies
        //設置對應磚類而碰撞觸發的函式
        // globalMap.setTileIndexCallback(3, this.enemyCollide, this);
        globalMap.setTileIndexCallback(ladderID, this.triggerLadder, this, this.layer_touched);
        globalMap.setTileIndexCallback(ladderTopID, this.triggerLadder, this, this.layer_touched);
        globalMap.setTileIndexCallback(deadBlockID, this.killZone, this, this.layer_touched);
        globalMap.setTileIndexCallback(exitZoneID, this.exitZone, this, this.layer_touched);
        // globalMap.setTileIndexCallback(8, this.exitZone, this);

        //Sets the world size to match the size of this layer.
        this.layer_touched.scale.set(1);
        this.layer_touched.resizeWorld();




    },
    //為glovalMap的範圍內所有磚塊為所有等於titleIndex設置上側碰撞
    setTopCollisionTiles: function (tileIndex, layer) {
        var x, y, tile;
        for (x = 0; x < globalMap.width; x++) {
            for (y = 1; y < globalMap.height; y++) {
                tile = globalMap.getTile(x, y, layer);
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
        //
        player_group = game.add.group();

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
        player = new Player(game, x, y);
        game.add.existing(player);
        player_group.add(player);
    },
    createCarrots: function () {

        //這是對應json裡的 物件層 物件名
        globalMap.createFromObjects("object", "carrot", "atlas", 0, true, false, carrots_group);
        // this.layer_touched.createFromObjects("object", "carrot", "atlas", 0, true, false, carrots_group);

        // globalMap.createFromObjects("object", 6, "atlas", 0, true, false, carrots_group);

        // add animation to all items
        carrots_group.callAll('animations.add', 'animations', 'spin', ['carrot/carrot-1', 'carrot/carrot-2', 'carrot/carrot-3', 'carrot/carrot-4'], 7, true);
        carrots_group.callAll('animations.play', 'animations', 'spin');

    },
    createStars: function () {

        globalMap.createFromObjects("object", "star", "atlas", 0, true, false, stars_group);
        // globalMap.createFromObjects("object", 20, "atlas", 0, true, false, stars_group);
        // add animations
        stars_group.callAll("animations.add", "animations", "spin-star", ["star/star-1", "star/star-2", "star/star-3", "star/star-4", , "star/star-5", , "star/star-6"], 10, true);
        stars_group.callAll("animations.play", "animations", "spin-star");
    },
    createBees: function () {
        // globalMap.createFromObjects("object", "bee", null, true, false, enemies_group, new Bee(game, 0, 0));
        var args = {};
        args.distance = 30;
        args.horizontal = true;
        this.createFromObjectsLocation(globalMap, "object", "bee", Library.spawn("bee", "normal"), args, enemies_group);
    },
    createSlugs: function () {
        // globalMap.createFromObjects("object", "bee", null, true, false, enemies_group, new Bee(game, 0, 0));
        var args = {};
        this.createFromObjectsLocation(globalMap, "object", "slug", Library.spawn("slug", "normal"), args, enemies_group);
    },
    createPlants: function () {
        // globalMap.createFromObjects("object", "bee", null, true, false, enemies_group, new Bee(game, 0, 0));
        var args = {};
        this.createFromObjectsLocation(globalMap, "object", "plant", Library.spawn("plant", "normal"), args, enemies_group);
    },
    createChests: function () {
        // globalMap.createFromObjects("object", "bee", null, true, false, enemies_group, new Bee(game, 0, 0));
        var args = {};
        this.createFromObjectsLocation(globalMap, "object", "chest", Library.spawn("chest", "normal"), args, chests_group);
    },
    createFromObjectsLocation: function (map, layerName, name, spawn, args, group) {
        if (spawn == null || spawn == undefined) {
            console.log(name, "spawn null");
        }
        var sprite;
        for (let index = 0, len = map.objects[layerName].length; index < len; index++) {
            if (map.objects[layerName][index].name == name) {
                spawn(map.objects[layerName][index].x, map.objects[layerName][index].y, args, group);
            }
        }

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
            Library.spawn("EnemyDeath", "normal")(enemy.x, enemy.y);
            // this.spawnEnemyDeath(enemy.x, enemy.y);
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
    // populate: function () {

    //     // this.spawnSlug(5, 10);
    //     this.spawnSlug(12, 10);
    //     this.spawnSlug(18, 12);
    //     this.spawnSlug(31, 2);
    //     this.spawnBee(33, 10, 20);
    //     this.spawnPlant(42, 10);
    //     this.spawnBee(48, 10, 30, true);
    //     this.spawnBee(60, 10, 30);
    //     this.spawnPlant(64, 5);

    //     this.spawnChest(71, 10);
    //     this.spawnChest(32, 21);

    //     this.spawnSlug(93, 21);
    //     this.spawnPlant(101, 20);
    //     this.spawnBee(111, 9, 30, true);
    //     this.spawnPlant(100, 7);

    //     this.spawnSlug(73, 21);
    //     this.spawnSlug(83, 21);

    //     this.spawnSlug(129, 11);
    //     this.spawnSlug(132, 11);

    //     this.spawnBee(142, 9, 30, false);

    // },
    // spawnSlug: function (x, y, args, group) {
    //     var temp = new Slug(game, x, y);
    //     game.add.existing(temp);
    //     // enemies_group.add(temp);
    //     if (group != null) {
    //         group.add(temp);
    //     }
    // },
    // spawnBee: function (x, y, args, group) {
    //     var temp = new Bee(game, x, y, args.distance, args.horizonta);
    //     game.add.existing(temp);
    //     // enemies_group.add(temp);
    //     if (group != null) {
    //         group.add(temp);
    //     }
    // },
    // spawnPlant: function (x, y, args, group) {
    //     var temp = new Plant(game, x, y);
    //     game.add.existing(temp);
    //     //enemies_group.add(temp);
    //     if (group != null) {
    //         group.add(temp);
    //     }
    // },
    // spawnChest: function (x, y, args, group) {
    //     var temp = new Chest(game, x, y);
    //     game.add.existing(temp);
    //     //chests_group.add(temp);
    //     if (group != null) {
    //         group.add(temp);
    //     }
    // },
    // spawnEnemyDeath: function (x, y, args, group) {
    //     var temp = new EnemyDeath(game, x, y);
    //     game.add.existing(temp);
    //     if (group != null) {
    //         group.add(temp);
    //     }
    // }
}
module.exports = playGame;