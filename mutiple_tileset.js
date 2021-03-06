function preload() {
    game.load.spritesheet('mario', 'mario-spritesheet.png',50,50);   //this loads a spritesheet (cachekey, filename, dimensions of one single frame in the spritesheet x, y)
    game.load.image('stars', 'stars-tilingsprite.png'); // this loads an image (in that case an image that is usable as tilingimage in x and y directions)
    game.load.image('hills', 'hills-tilingsprite.png'); // another image that can be used as tiling image in the x direction
    game.load.tilemap('testmap', 'test-tilemap-polygon.json', null, Phaser.Tilemap.TILED_JSON);  // this loads the json tilemap created with tiled (cachekey, filename, type of tilemap parser)
    game.load.image('test-tileset', 'test-tileset.png'); // this loads a very important image - it is the tileset image used in tiled to create the map  (cachekey, filename)
    game.load.image('ice-terrain', 'ice-terrain.png');
   /*
    this tileset image is loaded in tiled to create the tilemap, the NAME of this tileset will automatically be the name of the file without extension - this name is stored in the json file as
    reference to the specific tileset image. (you could rename this tileset in tiled but don't confuse yourself) 
    the "cachekey" needs to be the exact same name the tilset is named in tiled !
    */
}

function create() {

    game.world.setBounds(0, 0, 1920, 640);
    game.physics.startSystem(Phaser.Physics.P2JS); //this will start the powerful p2 physics system
    game.physics.p2.gravity.y = 1400;  // this creates an almost realistic gravity

    stars = game.add.tileSprite(0,0,800,640,'stars');  // this adds a tiling sprite that covers the whole canvas - the size of the canvas (800x640) is set below when you create a new phaser game
    stars.fixedToCamera=true;  // this settings fixates the image to the camera so it won't move
    hills = game.add.tileSprite(0,0,1920,640,'hills');  // these hills are spanned over the whole map  - the map is 40x20 tiles at 32x32 pixels so the whole map is 1280x640 pixels in size


    // now lets initialise the tilemap .. first we create a new tilemap and for further references we put it on "mymap"    (testmap is the cachekey given in the preload function - the cachekey was your own choice)
    mymap = game.add.tilemap('testmap');
    mymap.addTilesetImage('test-tileset');   //now we add a tilsetimage to the created map-object residing on "mymap" - the name of the tilesetimage is stored in the json file and needs to be the exact same name.. you already chose the right name in your preload function - now use this cachekey 
    mymap.addTilesetImage('ice-terrain'); 
    //create layers - every layer needs to be initialised.. you can leave some layers out - they wont be displayed then
    layermain = mymap.createLayer('layer1');   // on "mymap" we initialise a new layer - the layer with the name "layer1"  - this needs to be the exact same name as defined in tiled - it's stored in the json file
    layersecondary = mymap.createLayer('layer2');
    layerbackground = mymap.createLayer('layer3');  // again, for further reference we put this layerobject on a variable - for example "layerbackground"

    // layerbackground.resizeWorld();   // this resizes the game world to the size of the given layer.. in that case "layerbackground"  it doesn't matter which layer we use because all of them have the same size
    

    mymap.setCollisionByExclusion([0],true, 'layer1');  // here we activate a possible collision for all tiles on layer1 except the one with the index 0 (the index starts with 1 (first tile) so this means "collide with all tiles on the tilset that are placed on the layer)
    mymap.setCollisionBetween(1,20,true,'layer2');  // here we use a different approach - we activate the potential collision for all tiles with an index between 1 and 20 (again all tiles of the tilesetimage - there are only 20 tiles on it)
  // we don't activate collision for the last layer because we don't need it .. it will act as some sort of background
  // although we could do it because no actual collision will happen until we convert all the tiles marked as collideable to physics bodies with convertTilemap()

    // in p2 physics you will have to create physics bodies out of the tiles..  tiles that touch each other will create one big physics body instead of several small ones 
    layermain_tiles = game.physics.p2.convertTilemap(mymap, layermain);  // convertTilemap will create an array of all physics bodies 
    layersecondary = game.physics.p2.convertTilemap(mymap, layersecondary);
    layerobjects_tiles = game.physics.p2.convertCollisionObjects(mymap,"objects1");   // this converts the polylines of the tiled - object layer into physics bodies.. make sure to use the "polyline" tool and not the "polygon" tool - otherwise it will not work!!
    /*these polyline physics bodies will not be visible - so make sure you paint your hills and slanted tiles on a layer that acts as background (without collision enabled) */

    for (var i=0; i<layerobjects_tiles.length; i++){
      //  layerobjects_tiles[i].
        
    }

    player = game.add.sprite(150, 200, 'mario');   //this adds our player to the scene  (xposition, yposition, cachekey)
    game.physics.p2.enable(player); // enable physics for the player (p2)
    player.anchor.setTo(0.5,0.5); // set the anchor to the exact middle of the player (good for flipping the image on the same place)
    game.camera.follow(player);   // camera allways center the player
    player.body.setCircle(22,0,0);  // instead of a rectangle i want a circle (radius, offsetX, offsetY)
    player.body.fixedRotation=true;  // in p2 rotation is possible.. i don't want this on my player 
    player.animations.add('walk', [1,2,3,4,3,2], 10, true);  // this adds an animation for later use (custom cachekey, frames used for the animation, frames played per second, loop )

    cursors = game.input.keyboard.createCursorKeys();  // we need some cursor keys for our controls

}

function update() {
    hills.x = game.camera.x * 0.2;  // this moves the background "hills" relative to the camera (with 20% of it's speed) and creates the well known parallax effect

    player.body.velocity.x=0;  // reset player velocity every step  / instead of this you could work with materials and friction

    if (cursors.left.isDown ){   //  Move to the left
        player.scale.x = -1;  // a little trick.. flips the image to the left
        player.body.velocity.x = -300;
        player.animations.play('walk');  //now play the animation named "walk"
    }
    else if (cursors.right.isDown) {//  Move to the right
        player.scale.x = 1;
        player.body.velocity.x= 300;
        player.animations.play('walk');
    }
    else {
        player.loadTexture('mario', 0);   // this loads the frame 0 of my mario spritesheet  (stand)
    }

    if (cursors.up.isDown){
        player.loadTexture('mario', 5);   // this loads the frame 5 (jump) of my mario spritesheet
        if(touchingDown(player)){  // this checks if the player is on the floor (we don't allow airjumps)
            player.body.velocity.y = -800;   // change the y velocity to -800 means "jump!"
        }
    }
        
        
    angle(player);
    if (!touchingDown(player) ){player.angle=0;}
}

/*
this function uses the p2 collision calculations that are done on every step to find out if the player collides with something on the bottom - it returns true if a collision is happening
*/
function touchingDown(someone) {
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];  // cycles through all the contactEquations until it finds our "someone"
        if (c.bodyA === someone.body.data || c.bodyB === someone.body.data)        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === someone.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    } return result;
}


function angle(someone) {
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = 1;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];  // cycles through all the contactEquations until it finds our "someone"
        if (c.bodyA === someone.body.data || c.bodyB === someone.body.data)        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
           // if (c.bodyA === someone.body.data) d *= -1;
            someone.angle = c.normalA[0]*100;
            console.log(c.normalA[0])
        }
    } return result;
}




var game = new Phaser.Game(800, 640, Phaser.CANVAS, '',{preload:preload, create:create, update:update});  // this creates our game, the canvas with the given size 800x640, forces phaser to the CANVAS mode (because WEBGL sucs on most browsers)

// the empty '' (quotes) could be filled with the id of a specific html <div> element in which the game canvas should be created 
// preload: create: update: debug:  get the actual names of your functions .. you could name your preload function "loadit" and your update function "doit"  then this line would look like this
// var game = new Phaser.Game(800, 640, Phaser.CANVAS, '',{preload:loadit, create:create, update:doit});

// but why would you do that :)   

