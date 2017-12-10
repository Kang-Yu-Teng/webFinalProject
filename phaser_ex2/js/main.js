var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {preload: preload, create: create, update: update});

var ezText;
var myDate = new Date();

//用類建狀態
var state0 = {
	preload: function(){
		console.log(this);
	},
	create: function(){

	},
	update: function(){

	}
};

//用function建狀態
var state1 = function(){
	this.preload = function(){
		console.log(this);
	};
	this.create = function(){

	};
	this.update = function(){

	};
}

var state2 = function(){
	this.preload = function(){
		//preload 加載的資源會存入緩存
		console.log(this);
		//加載圖源範例
		this.game.load.image('milla','img/milla.jpg')		
	};
	this.create = function(){
		// onFocus：当游戏页面获得焦点时触发
		// onResume：当游戏从暂停状态恢复时触发
		// onBlue：当游戏页面失去焦点时触发
		// onPause：当游戏进入暂停状态时触发
		//持續監聽
		// this.game.onFocus.add(
		// 	this.handler,	//listener： 监听回调函数，当事件触发时被调用
		// 	this,	//listenerContext：回调上下文
		// 	0,	//priority：优先级，默认值：0	越大的值表示越高的优先级， 当事件触发时也最先被调用。如果多个监听函数具有相同的优先级，那么就按照添加 的先后顺序执行。
		// 	'focus'	//从这个参数开始，都被传入回调函数
		// )
		//監聽一次
		// this.game.onFocus.addOnce(
		// 	this.handler,	//listener： 监听回调函数，当事件触发时被调用
		// 	this,	//listenerContext：回调上下文
		// 	0,	//priority：优先级，默认值：0	越大的值表示越高的优先级， 当事件触发时也最先被调用。如果多个监听函数具有相同的优先级，那么就按照添加 的先后顺序执行。
		// 	'focus'	//从这个参数开始，都被传入回调函数
		// )

		//從緩存加載
		// var img = this.game.cache.getImage('milla');
		//保存為html的一個Image對象
		// document.body.prepend(img);

		// //建立sprite遊戲物件
		// this.avater = new Phaser.Sprite(
		// 	this.game,	//game遊戲實例
		// 	100,	//x
		// 	100,	//y
		// 	'milla'	//frame：贴图素材在缓存中的标识键 
		// )
		// //加入遊戲世界
		// this.game.world.add(this.avater);
		
		//遊戲對象工廠，封裝了創造與加入世界這兩個步驟
		this.avater = this.game.add.sprite(100,100,'milla');

		//背景類製作
		//TileSprite本质上还是一个sprite对象，不过这个sprite的贴图是可以移动的，并且会自动平铺来弥补移动后的空缺，所以我们的素材图片要是平铺后看不出有缝隙，就可以拿来当做TileSprite的移动贴图了。TileSprite的贴图既可以水平移动也可以垂直移动，或者两者同时移动，我们只需要调用TileSprite对象的autoScroll(x,y)方法就可以使它的贴图动起来了，其中x是水平方向的速度，y是垂直方向的速度。
		
		// var bg = game.add.tileSprite(0,0,game.width,game.height,'background'); //当作背景的tileSprite 
        // var ground = game.add.tileSprite(0,game.height-112,game.width,112,'ground').autoScroll(-100,0); //当作地面的tileSprite
        // bg.autoScroll(-10,0); //让背景动起来
		// ground.autoScroll(-100,0); //让地面动起来
		
		//動畫
		//spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing)
		// key : 给这张图片指定的名称，以后在创建sprite等对象时会要用到的
		// url: 图片的地址
		// frameWidth :  图片中每帧的宽度
		// frameHeight : 图片中每帧的高度
		// frameMax : 最多有几帧
		// margin : 每帧的外边距
		// spacing : 每帧之间的间隔
		// 实际上spritesheet方法就是能让我们加载一个图片，并在这个图片上划分出帧来，以后使用这个图片的sprite就可以用这些帧来播放动画啦。要在sprite上实现动画，我们首先还得先定义一个动画，就是定义这个动画是由哪些帧组成的。sprite对象有个animations属性，代表的是Phaser中专门管理动画的对象：AnimationManager，该对象有一个add方法，用来添加动画，还有一个play方法，用来播放动画，它们具体的参数可以参阅文档。

		//組
		// Phaser.Group，也就是组。组相当于一个父容器，我们可以把许多对象放进一个组里，然后就可以使用组提供的方法对这些对象进行一个批量或是整体的操作。比如要使组里的对象同意进行一个位移，只需要对组进行位移就可以了，又比如要对组里的所有对象都进行碰撞检测，那么就只需要对这个组对象进行碰撞检测就行了。
		// var titleGroup = game.add.group(); //创建存放标题的组
        // titleGroup.create(0,0,'title'); //通过组的create方法创建标题图片并添加到组里
        // var bird = titleGroup.create(190, 10, 'bird'); //创建bird对象并添加到组里
        // bird.animations.add('fly'); //给鸟添加动画
        // bird.animations.play('fly',12,true); //播放动画
        // titleGroup.x = 35; //调整组的水平位置
        // titleGroup.y = 100; //调整组的垂直位置
		// game.add.tween(titleGroup).to({ y:120 },1000,null,true,0,Number.MAX_VALUE,true); //对这个组添加一个tween动画，让它不停的上下移动
		// 上面代码中的Tween对象，是专门用来实现补间动画的。通过game.add的tween方法得到一个Tween对象,这个方法的参数是需要进行补间动画的物体。然后我们可以使用Tween对象的to方法来实现补间动画。
		// to(properties, duration, ease, autoStart, delay, repeat, yoyo)
		// properties :  一个js对象，里面包含着需要进行动画的属性，如上面代码中的 {y:120}
		// duration : 补间动画持续的时间，单位为毫秒
		// ease : 缓动函数，默认为匀速动画
		// autoStart : 是否自动开始
		// delay : 动画开始前的延迟时间，单位为毫秒
		// repeat : 动画重复的次数，如果需要动画永远循环，则把该值设为 Number.MAX_VALUE
		// yoyo : 如果该值为true,则动画会自动反转

		//button
		// var btn = game.add.button(game.width/2,game.height/2,'btn',function(){//添加一个按钮
        //     game.state.start('play'); //点击按钮时跳转到play场景
        // });
		// btn.anchor.setTo(0.5,0.5); //设置按钮的中心点
		//Phaser中很多对象都有一个anchor属性，它表示这个物体的中心点，物体的位置平移、旋转的轴，都是以这个中心点为参照的。所以上面代码中我们要使按钮水平垂直居中，除了要把按钮的x,y属性分别设为游戏的宽高的一半外，还要把按钮的中心点设为按钮的中心。
		

	};

	
	handler = function(even,label){
		console.log(this);
	}

	this.update = function(){

	};
	this.otherMethod = function(){

	};
}

//example: menu
// game.States.menu = function(){
//     this.create = function(){
//         game.add.tileSprite(0,0,game.width,game.height,'background').autoScroll(-10,0); //背景图
//         game.add.tileSprite(0,game.height-112,game.width,112,'ground').autoScroll(-100,0); //地板
//         var titleGroup = game.add.group(); //创建存放标题的组
//         titleGroup.create(0,0,'title'); //标题
//         var bird = titleGroup.create(190, 10, 'bird'); //添加bird到组里
//         bird.animations.add('fly'); //添加动画
//         bird.animations.play('fly',12,true); //播放动画
//         titleGroup.x = 35;
//         titleGroup.y = 100;
//         game.add.tween(titleGroup).to({ y:120 },1000,null,true,0,Number.MAX_VALUE,true); //标题的补间动画
//         var btn = game.add.button(game.width/2,game.height/2,'btn',function(){//按钮
//             game.state.start('play');
//         });
//         btn.anchor.setTo(0.5,0.5);
//     }
// }

//example: 物理引擎
// game.States.play = function(){
//     this.create = function(){
//         this.bg = game.add.tileSprite(0,0,game.width,game.height,'background');//背景图,这里先不用移动，游戏开始后再动
//         this.pipeGroup = game.add.group();//用于存放管道的组，后面会讲到
//         this.pipeGroup.enableBody = true;
//         this.ground = game.add.tileSprite(0,game.height-112,game.width,112,'ground'); //地板，这里先不用移动，游戏开始后再动
//         this.bird = game.add.sprite(50,150,'bird'); //鸟
//         this.bird.animations.add('fly');//添加动画
//         this.bird.animations.play('fly',12,true);//播放动画
//         this.bird.anchor.setTo(0.5, 0.5); //设置中心点
//         game.physics.enable(this.bird,Phaser.Physics.ARCADE); //开启鸟的物理系统
//         this.bird.body.gravity.y = 0; //鸟的重力,未开始游戏，先让重力为0，不然鸟会掉下来
//         game.physics.enable(this.ground,Phaser.Physics.ARCADE);//开启地面的物理系统
//         this.ground.body.immovable = true; //让地面在物理环境中固定不动

//         this.readyText = game.add.image(game.width/2, 40, 'ready_text'); //get ready 文字
//         this.playTip = game.add.image(game.width/2,300,'play_tip'); //提示点击屏幕的图片
//         this.readyText.anchor.setTo(0.5, 0);
//         this.playTip.anchor.setTo(0.5, 0);

//         this.hasStarted = false; //游戏是否已开始
//         game.time.events.loop(900, this.generatePipes, this); //利用时钟事件来循环产生管道
//         game.time.events.stop(false); //先不要启动时钟
//         game.input.onDown.addOnce(this.statrGame, this); //点击屏幕后正式开始游戏
//     };
// }

// object : 要开启物理系统的对象，可以是单个对象，也可以是一个包含多个对象的数组
// system : 要启用的物理系统，默认为 Phaser.Physics.ARCADE，Phaser目前支持三种物理引擎，分别是Arcade ，P2 以及 Ninja。
// debug : 是否开启调试
// 只有开启了对象的物理系统，该对象才具有物理特性，开启了物理系统后，对象的body属性指向该对象拥有的物理系统，所有与物理相关的属性或方法都必须在body上进行操作。

//鼠标点击事件
// var input = game.input; //当前游戏的input对象
// var signal = input.onDown; //鼠标按下时的 Signal对象
// signal.add(function(){}); //给Signal 绑定事件处理函数
// signal.add(function(){}); //再绑定一个
// signal.addOnce(function(){}); //绑定一个只会执行一次的事件函数

//輸入範例
// this.game.input.onUp.add(function(pointer/*指针设备*/,event/*DOM事件*/){
//     console.log(pointer.x,pointer.y)
//     console.log(event.target)
//   },this)

// this.game.input.onTap.add(function(pointer/*指针设备*/,double/*是双击吗？*/){
//   console.log(double)  //true 或 false
// },this)
//默认的按下时长阈值为2000毫秒，可以调整输入管理器的holdRate属性来改变这个值。

//time and execute
// loop(delay, callback, callbackContext, arguments); //以指定的时间间隔无限重复执行某一个函数，直到调用了Timer对象的stop()方法才停止
// repeat(delay, repeatCount, callback, callbackContext, arguments); //让某个函数重复执行，可以指定重复的次数
// 当前的Timer对象我们可以通过 game.time.events 来得到，在调用了Timer对象的loop或repeat方法后，还必须调用start方法来启动。但是我使用的Phaser 2.0.4 版本，好像不调用start方法，loop方法就自动起作用了，不知道这是不是一个bug。如上面代码中我们用到的：
// game.time.events.loop(900, this.generatePipes, this); //利用时钟对象来重复产生管道
// game.time.events.stop(false); //先让他停止，因为即使没调用start方法，它也会自动启动，这应该是一个bug

// Phaser中支持两种方法来处理键盘输入：基于键盘事件或轮询。不过不同于 通常的应用程序，在游戏开发中，更常用轮询的方法来检测键盘输入状态。这主要 基于两点考虑：

// 游戏逻辑本身就是周期性更新的
// 同步的轮询代码比异步的事件代码更容易维护一些。
// var state6 = {
// 	update: function(){
// 	  if(this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) this.avatar.x -= 1
// 	  if(this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) this.avatar.x += 1
// 	  if(this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) this.avatar.y -= 1
// 	  if(this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) this.avatar.y += 1
// 	}
//}


//鍵名對應
// 基于这些语义化的常量，我们就可以避免使用码值进行比较和判断了。
// Phaser为标准键盘上的每个键都声明了一个语义化的常量，这些常量都定义在 Phaser.KeyCode命名空间下。例如：

// Phaser.KeyCode.LEFT：表示左方向键
// Phaser.KeyCode.ONE：表示数字1键
// Phaser.KeyCode.A：表示字母A键
// Phaser.KeyCode.SPACEBAR：表示空格键

//example: start game
// this.statrGame = function(){
//     this.gameSpeed = 200; //游戏速度
//     this.gameIsOver = false; //游戏是否已结束的标志
//     this.hasHitGround = false; //是否已碰撞到地面的标志
//     this.hasStarted = true; //游戏是否已经开始的标志
//     this.score = 0; //初始得分
//     this.bg.autoScroll(-(this.gameSpeed/10),0); //让背景开始移动
//     this.ground.autoScroll(-this.gameSpeed,0); //让地面开始移动
//     this.bird.body.gravity.y = 1150; //给鸟设一个重力
//     this.readyText.destroy(); //去除 'get ready' 图片
//     this.playTip.destroy(); //去除 '玩法提示 图片
//     game.input.onDown.add(this.fly, this); //给鼠标按下事件绑定鸟的飞翔动作
//     game.time.events.start(); //启动时钟事件，开始制造管道
// }
// this.fly = function(){
//     this.bird.body.velocity.y = -350; //飞翔，实质上就是给鸟设一个向上的速度
//     game.add.tween(this.bird).to({angle:-30}, 100, null, true, 0, 0, false); //上升时头朝上的动画
//     this.soundFly.play(); //播放飞翔的音效
// }

// 重力和速度
// Phaser.Physics.Arcade.Body 对象，也就是当你是用arcade物理引擎时 sprite.body 所指向的对象，拥有很多跟物理相关的属性和方法。其中的 gravity 对象代表重力，它有x和y两个属性，分别代表水平方向和垂直方向的重力。我们可以使用它的 setTo(x,y)方法来同事设置两个方向的重力。设置了重力的物体，它的运动会受到重力的影响，与真实生活中的物理现象是一致的。然后这个body它还有一个 velocity 对象，表示物体的速度，跟重力一样，都分水平和垂直两个方向，也可以用setTo(x,y)方法来设置。一旦给物体设置了合适的速度，它便能动了。


// 更精细地处理键盘输入的方法，是为感兴趣的键，使用addKey()方法创建一个热键 Phaser.Key对象，热键对象不仅可以轮询和监听事件，而且提供了一些对于游戏逻辑 非常有用的属性：

// hotkey

// 例如，下面的代码为空格键创建一个热键对象，并且使用按键时长（热键的duration 属性）作为攻击的力量值：

// var state0 = {
//   create : function(){
//     this.attackKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
//   },
//   update : function(){
//     if(this.attackKey.justUp) this.attack(this.attackKey.duration)   
//   },
//   attack: function(power){...}
// }
// 热键的justUp属性用来判定一个刚抬起的键 —— 上一个游戏周期还是按下，而这个周期 抬起了。

// √ 同时创建多个热键

// 可以使用键盘管理器的addKeys(config)方法同时创建多个热键，例如，下面的代码为四个 方向键同时创建热键，返回值的四个属性分别代表了对应的Phaser.Key对象：

// var state0 = {
//   create: function(){
//     this.cursors = this.game.input.keyboard.addKeys({
//       left: Phaser.KeyCode.LEFT,
//       right: Phaser.KeyCode.right,
//       up: Phaser.KeyCode.UP,
//       down: Phaser.Keycode.DOWN
//     })
//   },
//   update: function(){
//     if(this.cursors.left.isDown) console.log('left is down')
//   }
// }
// √ 方向热键的语法糖

// 由于在游戏中使用这四个键的频率如此之高，因此Phaser进一步提供了addCursorKeys() 方法来创建方向键的热键：

// var state0 = {
//   create: function(){
//     this.cursors = this.game.input.keyboard.createCursorKeys()
//   },
//   update: function(){
//     if(this.cursors.left.isDown) console.log('left is down')
//   }
// }


//建立出邊界會回收的物件
// this.generatePipes = function(gap){ //制造一组上下的管道
//     gap = gap || 100; //上下管道之间的间隙宽度
//     var position = (505 - 320 - gap) + Math.floor((505 - 112 - 30 - gap - 505 + 320 + gap) * Math.random());//计算出一个上下管道之间的间隙的随机位置
//     var topPipeY = position-360; //上方管道的位置
//     var bottomPipeY = position+gap; //下方管道的位置

//     if(this.resetPipe(topPipeY,bottomPipeY)) return; //如果有出了边界的管道，则重置他们，不再制造新的管道了,达到循环利用的目的

//     var topPipe = game.add.sprite(game.width, topPipeY, 'pipe', 0, this.pipeGroup); //上方的管道
//     var bottomPipe = game.add.sprite(game.width, bottomPipeY, 'pipe', 1, this.pipeGroup); //下方的管道
//     this.pipeGroup.setAll('checkWorldBounds',true); //边界检测
//     this.pipeGroup.setAll('outOfBoundsKill',true); //出边界后自动kill
//     this.pipeGroup.setAll('body.velocity.x', -this.gameSpeed); //设置管道运动的速度
// }
// this.resetPipe = function(topPipeY,bottomPipeY){//重置出了边界的管道，做到回收利用
//     var i = 0;
//     this.pipeGroup.forEachDead(function(pipe){ //对组调用forEachDead方法来获取那些已经出了边界，也就是“死亡”了的对象
//         if(pipe.y<=0){ //是上方的管道
//             pipe.reset(game.width, topPipeY); //重置到初始位置
//             pipe.hasScored = false; //重置为未得分
//         }else{//是下方的管道
//             pipe.reset(game.width, bottomPipeY); //重置到初始位置
//         }
//         pipe.body.velocity.x = -this.gameSpeed; //设置管道速度
//         i++;
//     }, this);
//     return i == 2; //如果 i==2 代表有一组管道已经出了边界，可以回收这组管道了
// }


// 碰撞检测
// 好了，管道和鸟都已经有了，而且它们都能动了，接下来就是，实现鸟撞到管道或地面后游戏结束的功能了。
// 在Arcade物理引擎中，碰撞检测主要用到两个函数，一个是collide，还有一个是overlap。
// collide方法与overlap的区别在于collide会影响两个要检测的对象之间的物理状态，比如使用collide函数去检测两个物体，如果物体碰撞了，那么这两个物体之间就会有力的相互作用，可能其中一个会被另一个弹开，或者两个之间相互弹开。但如果使用overlap方法的话，则只会检测两个物体是否已经碰撞了，或者说已经重叠了，并不会产生物理作用，显然，如果只需要知道两个物体是否已经重叠了的话，overlap性能会更好。
// 碰撞检测可以单个对象与单个对象进行检测、单个对象与组进行检测、组与组进行检测。collide方法必须在每一帧中都进行调用，才能产生碰撞后的物理作用。

// this.update = function(){ //每一帧中都要执行的代码可以写在update方法中
//     if(!this.hasStarted) return; //游戏未开始,先不执行任何东西
//     game.physics.arcade.collide(this.bird,this.ground, this.hitGround, null, this); //检测与地面的碰撞
//     game.physics.arcade.overlap(this.bird, this.pipeGroup, this.hitPipe, null, this); //检测与管道的碰撞
//     if(this.bird.angle < 90) this.bird.angle += 2.5; //下降时鸟的头朝下的动画
//     this.pipeGroup.forEachExists(this.checkScore,this); //分数检测和更新
// }

//example: 分數判定
//只需要在每一帧中对每一个管道都调用一次该函数，就可以了。
// this.checkScore = function(pipe){//负责分数的检测和更新,pipe表示待检测的管道
//     //pipe.hasScored 属性用来标识该管道是否已经得过分
//     //pipe.y<0是指一组管道中的上面那个管道，一组管道中我们只需要检测一个就行了
//     //当管道的x坐标 加上管道的宽度小于鸟的x坐标的时候，就表示已经飞过了管道，可以得分了
//     if(!pipe.hasScored && pipe.y<=0 && pipe.x<=this.bird.x-17-54){
//         pipe.hasScored = true; //标识为已经得过分
//         this.scoreText.text = ++this.score; //更新分数的显示
//         this.soundScore.play(); //得分的音效
//         return true; 
//     }
//     return false;
// }


// 声音的播放
// 在Phaser中播放一段声音很简单，只需要事先加载好声音资源。然后调用play方法播放就行了。
// 首先使用 game.load.audio() 来加载声音资源。我们以本游戏中得分时播放的声音为例，在state的preload方法中预先加载声音资源
//game.load.audio('score_sound', 'assets/score.wav');//得分的音效
// 然后通过 game.add.sound() 来得到一个sound对象
// this.soundScore = game.add.sound('score_sound');

// √ 开启物理系统

// 使用物理系统管理器的startSystem()方法启用指定的物理系统。框架在 Phaser.Physics命名空间下定义了以下常量分别标识不同的物理系统：

// Phaser.Physics.ARCADE ： Arcade物理系统
// Phaser.Physics.P2JS ： P2物理系统
// Phaser.Physics.NINJA ： Ninja物理系统
// Phaser.Physics.BOX2D ： Box2d物理系统
// 例如，下面的代码将启用P2物理系统，它将实例化Phaser.Physics.P2类 并设置物理系统管理器的p2属性：

// var state0 = {
//   init: function(){
//     this.game.physics.startSystem(Phaser.Physics.P2JS)
//   }
// }
// 当P2系统启用后，我们就可以通过game.physics.p2来访问P2物理系统了。

// 当Phaser框架启动时，Arcade物理系统是自动开启的，不过你显式地调用 startSystem()来启用它也没什么副作用。显然，我们随时可以通过 game.physics.arcade来访问Arcade物理系统。

// √ 为游戏对象启用物理模拟

// 尽管Arcade物理系统是默认开启的，尽管在一个游戏中可以同时启用多个物理系统， 但是，你添加到游戏世界中的游戏对象，并不会默认地启用任何一种物理系统模拟 —— 出于性能的考虑，开发者需要手动地为游戏对象启用物理模拟 —— 并且，一个游戏对象 只能启用一种物理系统的模拟。

// 使用特定物理系统的enable()方法来为一个指定的游戏对象启用该物理系统的 模拟。例如，下面的代码为游戏对象this.avatar启用Arcade物理模拟：

// var state0 = {
//   init: function(){
//     this.game.physics.startSystem(Phaser.Physics.ARCADE)
//     this.game.physics.arcade.gravity.set(0,100)
//   },
//   create:function(){
//     this.avatar = this.game.add.sprite(100,100,'clown')
//     this.game.physics.arcade.enable(this.avatar)
//   }
// }

// √ 设置物理系统的参数

// 物理模拟的效果严重地依赖于各种参数的设置。例如，重力参数gravity。

// gravity是一个Phaser.Point类型的参数，它有两个属性x和y，分别 表示水平和垂直方向的重力加速度，单位是像素/秒*秒。我们可以直接设置 其x或y属性，或者使用set(x,y)方法来设置值：
// 在上面的代码中，gravity参数被设置为垂直方向100，这意味着每过1秒， 物体下降的速度将增加100像素 —— 随着时间的流逝，物体下降的速度将越来越快。

// 直接在物理系统上设置的参数，例如this.game.physics.arcade.gravity，被 称为物理系统的全局参数，它将影响所有启用该物理系统进行模拟的游戏对象。

// √ 游戏对象的物理实体

// 当我们使用物理系统的enable()方法为一个游戏对象开启物理模拟时，该游戏 对象将获得一个额外的属性body。例如，在Arcade系统下，body是一个 Phaser.Physics.Arcade.Body实例：

// var state0 = {
// 	create:function(){
// 	  this.avatar = this.game.add.sprite(100,100,'clown')
// 	  this.game.physics.arcade.enable(this.avatar)
// 	  this.avatar.body.velicity.set(200,0)
// 	}
//   }


//camera
// 默认情况下，Phaser会使用我们给出的游戏尺寸，创建一个同样大小的游戏世界 （Phaser.World对象），并将其设置为游戏实例对象的world属性。我们创建 的游戏对象，例如sprite、text，都是加入到了这个游戏世界中。

// 游戏世界的大小其实是可以任意设定的，例如，this.game.world.setBounds(0,0,2000,2000) 将游戏世界设置为(0,0) 至(2000,2000)这样一个矩形包围框。

// Phaser通过一个摄像机Phaser.Camera来选择其视野范围内的世界渲染到游戏画布上：
// 摄像机对象是附着在游戏世界上的，我们可以通过Phaser.World对象的camera属性来访问 这个世界的摄像机。

// √ 移动摄像机

// 显然，可以通过移动摄像机（设置摄像机对象的x和y属性）来观察游戏世界的不 同角落，这适合于那些策略类型的游戏。

// 在下面的示例中，当操作方向键时，将移动摄像机来覆盖游戏世界的不同区域：

// if(this.cursors.left.isDown) this.game.world.camera.x -= 1
// if(this.cursors.right.isDown) this.game.world.camera.x += 1
// if(this.cursors.up.isDown) this.game.world.camera.y -= 1
// if(this.cursors.down.isDown) this.game.world.camera.y += 1
// 为了观察到摄像机视野的变化，示例代码中添加了一个拼接背景（Phaser.TileSprite对象）， 它可以将指定的纹理素材，无缝地铺满整个区域。

// √ 跟随游戏对象

// 另一种使用摄像机的方式是，让摄像机跟随游戏对象的运动（使用follow()方法）， 从而提供某种程度的沉浸感。在如超级马里奥这样的平台类游戏中，常会看到这一方法 的应用。

// 例如，下面的代码中，当操作键盘移动游戏对象时，摄像机会自动保持游戏对象在视野内：

// this.game.world.camera.follow(this.avatar)


//縮放
// 我们在启动框架时，指定的尺寸为游戏大小，框架将使用这个尺寸创建一个同样 大小的canvas元素：

// canvas scale

// 很多情况下，我们希望游戏的尺寸能够适应用户（不同的）屏幕大小，以便营造更好 的代入感。可以有两种途径来实现屏幕适配：

// 根据屏幕大小，调整游戏尺寸：这一方案可以保持恒定的游戏 对象尺寸，但是由于开发时不能确定游戏尺寸，会给游戏逻辑的开发造成一些麻烦；

// 根据屏幕大小，缩放游戏画布：这一方案可以保持恒定的游戏尺寸，因此在 开发期容易处理定位问题，但是如果缩放比例不合适，会造成游戏对象模糊。

// √ 比例管理器

// Phaser使用比例管理器Phaser.ScaleManager来管理这些缩放处理逻辑，它同时 支持这两种屏幕适配方案，并且支持全屏。我们可以通过Phaser.Game实例 的scale属性，来直接访问并使用比例管理器。

// 使用Phaser.ScaleManager.scaleMode属性来设置屏幕适配模式。可选的模式包括：

// Phaser.ScaleManager.EXACT_FIT ：精确匹配模式。将游戏画布缩放至占满父元素 空间，不考虑游戏本身的宽高比例。
// Phaser.ScaleManager.SHOW_ALL ：全显式模式。将游戏画布缩放至尽可能占满父元素 空间，同时保持游戏本身的宽高比例
// Phaser.ScaleManager.NO_SCALE ： 无缩放模式。不进行缩放，保持游戏本身大小。
// Phaser.ScaleManager.USER_SCALE ：自定义缩放比例模式。由用户使用setUserScale() 方法来声明游戏画布的缩放比例
// Phaser.ScaleManager.RESIZE ：根据父元素的尺寸自动调整游戏大小
// 例如，下面的代码启用全显示SHOW_ALL模式：

// var game = new Phaser.Game(700,300)
// game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
// 如果游戏画布没有占满父元素空间，可以设置其对齐属性：

// Phaser.ScaleManager.pageAlignHorizontally : 水平对齐，可选值：true或false
// Phaser.ScaleManager.pageAlignVertically : 垂直对齐，可选值：true或false


// // 实际应用场景改为window.innerWidth和window.innerHeight。
// // 这里是为了方便查看示例。
// var width = 320;
// var height = 568;

// // 创建游戏实例
// var game = new Phaser.Game(width, height, Phaser.AUTO, '#game');

// // 定义场景
// var states = {
// 	// 加载场景
//     preload: function() {},
//     // 开始场景
//     created: function() {},
//     // 游戏场景
//     play: function() {},
//     // 结束场景
//     over: function() {}
// };

// // 添加场景到游戏示例中
// Object.keys(states).map(function(key) {
// 	game.state.add(key, states[key]);
// });

// 每个场景都有自己的生命周期，常用的生命周期是preload（加载）、create（准备就绪）、update（更新周期）、render（渲染完成）。顺带介绍一下这四个生命周期吧（详细介绍可以查看官方离线文档）：

// preload - 尽管我们有预加载的场景，但如果你希望能缩短进入页面时加载的时间，可以分摊一些到其他场景，只需要在其他场景加入preload方法即可。
// create - 如果存在preload方法，则会在加载完毕后执行此方法；否则将在进入该场景时直接执行此方法。
// update - 更新周期自动执行的方法，例如在play场景的update方法中可以去检测两个物体是否有接触。
// render - 渲染完毕后执行的方法，例如可以在此方法中勾勒出物体的边缘，来方便观察物体的碰撞区域。

// 加载图片

// game.load.image('star', 'star.png');
// 加载音频

// game.load.audio('bg', 'bg.mp3)');
// 加载图片序列

// 由于要指定帧的宽高，因此一般是动画的连续帧，例如行走动画的每一帧合成的图片。

// game.load.spritesheet('walk', 'walk.png', 80, 80);
// 加载资源集合

// 同样可以用作加载图片序列，但这种用法主要用于加载类似于TexturePacker打包出来的资源集合。相比于spritesheet一般是一连串的动画帧合成的图片，这种资源集合中的图片可以是各种各样的，和我们平常做网站会将icon、背景图片等合成sprites一个道理。
// 打包出来的资源一般包括一个json和一张合成的图片，json描述了合成图片中每张图片的宽高位置等信息。

// game.load.altasJSONArray('fly', 'fly.png', 'fly.json');

// 第二步：监听加载完成的事件

// 通常来说我们都需要反馈加载进度，例如一个进度条，或者是一个百分比的数字。于是我们接下来就需要监听加载完成的事件了。

// // 监听加载完毕事件
// game.load.onLoadComplete.add(function() {
//     alert('加载完毕!');
// });
// 如果我们需要监听到加载的进度，那么可以用下面的方法：

// // 添加进度文字
// var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
//     fontSize: '60px',
//     fill: '#ffffff'
// });
// progressText.anchor.setTo(0.5, 0.5); // 设置锚点，用于居中
// // 监听加载完一个文件的事件
// game.load.onFileComplete.add(function(progress) {
//     progressText.text = progress + '%';
// });

// 添加加载页的最小展示时间

// 一般而言，我们做游戏都会在loading界面放一个LOGO，作为展示宣传用，那么如果需要加载的资源体积很小的话，有可能加载界面就是一闪而过了。于是，根据我们开发的经验，会设置一个最小的展示时间（例如3秒），在未到最小的展示时间前，即便资源已经加载完毕，也不会离开加载场景。

// // 监听加载完毕事件
// game.load.onLoadComplete.add(onLoad);
// // 最小展示时间，示例为3秒
// var deadLine = false;
// setTimeout(function() {
//     deadLine = true;
// }, 3000);
// // 加载完毕回调方法
// function onLoad() {
//     if (deadLine) {
//         // 已到达最小展示时间，可以进入下一个场景
//         game.state.start('created');
//     } else {
//         // 还没有到最小展示时间，1秒后重试
//         setTimeout(onLoad, 1000);
//     }
// }

// 物理引擎

// 几乎每一个游戏框架都必须具备一个甚至多个物理引擎供开发使用，使用物理引擎可以实现例如碰撞、加减速运动、摩擦力等效果。Phaser非常人性化，提供了3个物理引擎供开发者使用，每个引擎各有自己的特点。下面来简单介绍一下：

// Arcade

// 最简单快速的物理引擎，因为只支持AABB式的碰撞，计算速度最快，实现简单的物理碰撞、接触、重力等效果最佳。

// 关于AABB下面有几个链接可以让你去理解，全称是Axis-Aligned Bounding Box，直译就是轴对称盒。例如一张星星的图片，尽管边上很多透明的部分，但如果使用AABB来计算碰撞的话，则会用一个矩形将星星框住，这样计算起来非常方便，但精度就比较低。如此一来我们也可以想到，用Arcade构建的body是不可以发生形变的。

//P2

// 如果说Arcade是小而精，P2引擎则是大而全了。各种物理模型均可实现，诸如多边形、弹簧、摩擦力、碰撞物体的材质、反弹系数等等都可以实现。尽管在性能上有一定消耗，毕竟要做更多复杂的运算，但为了效果，我们也很常用P2，作者引进P2也是由于它的全面。

// Ninja

// 至于Ninja，则是比较专注精确的多种模式的碰撞检测。例如凹凸面的碰撞、平面和球的碰撞等等。平常比较少用，有兴趣的可以查看官方示例，另外，作者给出引进Ninja的理由是：

// It's a really nice little physics system, supporting AABB and Circle vs. Tile collision, with lots of defs for sloping, convex and concave tile types. But that's all it does, it's not trying to be anything more really.

// // 创建背景音乐实例
// var bgMusic = game.add.audio('bgMusic');
// // 循环播放
// bgMusic.loopFull();

//移動範例
// // 是否正在触摸
// var touching = false;
// // 监听按下事件
// game.input.onDown.add(function(pointer) {
//     // 要判断是否点住主角，避免瞬移
//     if (Math.abs(pointer.x - man.x) < man.width / 2) touching = true;
// });
// // 监听离开事件
// game.input.onUp.add(function() {
//     touching = false;
// });
// // 监听滑动事件
// game.input.addMoveCallback(function(pointer, x, y, isTap) {
//     if (!isTap && touching) man.x = x;
// });

// 組
// 这里用到了Phaser的group，实际上可以理解成是一个数组，只不过更形象，组的常用方法：

// add/addChild/addChildAt - 创建成员
// countDead/countLiving - 统计成员
// forEach/forEachAlive/forEachDead - 遍历成员
// remove/removeAll/removeChildAt - 删除成员
// create - 创建成员
// bringToTop - 整个组的元素的图层提到最上层
// 另外组本身也有x,y等属性，也就是说，整个组的成员都可以根据组的偏移值而一起偏移！另外组还提供了很多丰富的方法，活用组可以达到事半功倍的效果。

// // 添加苹果组
// var apples = game.add.group();
// var green = apples.create(50, 0, 'green');
// var red = apples.create(150, 0, 'red');
// var yellow = apples.create(250, 0, 'yellow');


// 定时随机创造苹果

// 上面我们看到有三种苹果，那么下面我们来实现：每隔一段时间，随机创建三种苹果中的一种，并且摆放到不同的位置。

// 为此我们用到Phaser的timer，用于创建定时任务。会有人问为什么不用setInterval，setTimeout这些，是因为Phaser只要焦点离开了页面，就会自动暂停游戏，包括定时任务也会暂停，而setInterval和setTimeout则不会。

// 一般会用到add和loop两个方法，分别对应setTimeout和setInterval：

// // 添加苹果组
// var apples = game.add.group();
// // 苹果类型
// var appleTypes = ['green', 'red', 'yellow'];
// var appleTimer = game.time.create(true);
// appleTimer.loop(1000, function() {
//     var x = Math.random() * game.world.width;
//     var y = Math.random() * game.world.height;
//     var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
//     apples.create(x, y, type);
// });
// appleTimer.start();


//物理引擎
// // 添加苹果组
// var apples = game.add.group();
// // 苹果类型
// var appleTypes = ['green', 'red', 'yellow'];
// var appleTimer = game.time.create(true);
// appleTimer.loop(1000, function() {
//     var x = Math.random() * game.world.width;
//     var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
//     var apple = apples.create(x, 0, type);
//     // 设置苹果大小
//     var appleImg = game.cache.getImage(type);
//     apple.width = game.world.width / 8;
//     apple.height = apple.width / appleImg.width * appleImg.height;
//     // 设置苹果加入物理运动
//     game.physics.enable(apple);
// });
// appleTimer.start();
// // 开启物理引擎
// game.physics.startSystem(Phaser.Physics.Arcade);
// game.physics.arcade.gravity.y = 300;

// 对主角的修改：

// game.physics.enable(man); // 加入物理运动
// man.body.allowGravity = false; // 清除重力影响
// 检测接触事件要写在play场景的update生命周期内，意思为每次更新视图都会去检测主角和苹果是否有接触，有的话，则执行pickApple方法。

// this.update = function() {
//     // 监听接触事件
//     game.physics.arcade.overlap(man, apples, pickApple, null, this);
// }
// 接触事件则非常简单，调用apple的kill方法，则可以让苹果从场景中清除。同时，我们更新一下分数。

// // 接触事件
// function pickApple(man, apple) {
//     apple.kill();
//     title.text = ++score;
// }

// 检测苹果与场景边缘的接触
// 一旦接触，则游戏结束，跳转到结束场景
// 布置结束场景，并显示分数
// 为结束场景添加点击事件，点击后再玩一次
// onWorldBounds属性可设置为一个Phaser.Signal对象，当开启了collideWorldBounds并且接触到场景边缘时，将触发Signal的事件。另外，这个特殊的Signal提供了上下左右四个值来让我们判断物体到底接触的是哪条边，考虑到有些苹果会接触到左右两边，我们只在和下边界接触的时候才结束游戏。

// // 设置苹果与游戏边缘碰撞，
// apple.body.collideWorldBounds = true;
// apple.body.onWorldBounds = new Phaser.Signal();
// apple.body.onWorldBounds.add(function(apple, up, down, left, right) {
//     if (down) {
//         apple.kill();
//         game.state.start('over', true, false, score);
//     }
// });


// onWorldBounds属性可设置为一个Phaser.Signal对象，当开启了collideWorldBounds并且接触到场景边缘时，将触发Signal的事件。另外，这个特殊的Signal提供了上下左右四个值来让我们判断物体到底接触的是哪条边，考虑到有些苹果会接触到左右两边，我们只在和下边界接触的时候才结束游戏。

// // 设置苹果与游戏边缘碰撞，
// apple.body.collideWorldBounds = true;
// apple.body.onWorldBounds = new Phaser.Signal();
// apple.body.onWorldBounds.add(function(apple, up, down, left, right) {
//     if (down) {
//         apple.kill();
//         game.state.start('over', true, false, score);
//     }
// });
// 布置结束场景，和之前布置其他场景一样，添加背景、文本等等。不同的是这次多了init这个生命周期，主要是由于在play场景中跳转到这个场景时会带上score，这个score会传入init这个生命周期的方法中。

// // 结束场景
// over: function() {
//     var score = 0;
//     this.init = function() {
//         score = arguments[0];
//     }
//     this.create = function() {
//         // 添加背景
//         var bg = game.add.image(0, 0, 'bg');
//         bg.width = game.world.width;
//         bg.height = game.world.height;
//         // 添加文本
//         var title = game.add.text(game.world.centerX, game.world.height * 0.25, '游戏结束', {
//             fontSize: '40px',
//             fontWeight: 'bold',
//             fill: '#f2bb15'
//         });
//         title.anchor.setTo(0.5, 0.5);
//         var scoreStr = '你的得分是：'+score+'分';
//         var scoreText = game.add.text(game.world.centerX, game.world.height * 0.4, scoreStr, {
//             fontSize: '30px',
//             fontWeight: 'bold',
//             fill: '#f2bb15'
//         });
//         scoreText.anchor.setTo(0.5, 0.5);
//     }
// }
// 最后我们在结束场景添加一个点击事件，点击后跳转到play场景，再玩一次。

// var remind = game.add.text(game.world.centerX, game.world.height * 0.6, '点击任意位置再玩一次', {
//     fontSize: '20px',
//     fontWeight: 'bold',
//     fill: '#f2bb15'
// });
// remind.anchor.setTo(0.5, 0.5);
// // 添加点击事件
// game.input.onTap.add(function() {
//     game.state.start('play');
// });

//tween
// 为不同苹果设置不同的得分
// 接到苹果时添加对应的得分图片到场景中
// 为得分图片添加过渡效果
// 先来介绍一下Phaser的过渡：

// 要使用过渡，首先要创建过渡对象，传入的是要应用过渡效果的对象，例如apple。

// // 创建过渡对象
// game.add.tween(obj);
// 然后使用得最多的是Tween的to方法，也就是过渡到指定状态的方法。可以指定过渡时间曲线，延迟、是否重复、过渡时间等等参数，使用Tween已经可以实现大部分的动画效果。


// State的生命周期：
// init() -> preload() -> create() -> update() -> shutdown()
// init：当场景启动的时候就会调用init，注意，这时候还没有加载任何资源。
// preload：在这里进行资源加载。不要在这里使用你加载的对象，他们可能还没有加载完成。
// create：资源加载完成后，会回调create。
// update：这里是游戏的主循环。
// shutdown：当你跳转到其他场景时，会调用shutdown
 
// 场景创建好之后，怎么在游戏中使用呢？
// game.state.add：添加场景
// game.state.start：进入场景
 
// 场景的重入要注意的事项
// start(key, clearWorld, clearCache, parameter)

// 场景重入的时候，可以指定是否将world中的对象清除。但是，如果绑定在state上的属性，还会存在。详见视频。
 

// Phaser游戏中的一些主要对象及概念
// Game对象：整个游戏的核心
// World对象：游戏世界，可以无限大，是一个虚拟的世界。默认和舞台一样大。
// Stage对象：舞台对象，是我们看到的区域。他是所有可显示对象的根节点。
// Camara对象：相机对象，可以在世界中移动，改变我们的视野区域。
// State对象：场景对象，对应游戏中的一个场景，场景直接可以切换。
// Sprite对象：精灵对象，对应游戏中的一个角色，甚至任何东西。

// Cache对象：缓存对象，对应Phaser中的缓存系统。
// Group对象：组对象，可以把有相同行为的Sprite放在一个组里，方便管理。
// Tween对象：用来进行渐变动画的对象。
// Animation对象：用来进行帧动画的对象。
// Physics对象：Phaser中的物理引擎。物理引擎用来模拟物理世界的重力，速度，阻力，碰撞等等。Phaser中默认提供了3种物理引擎，还可以通过插件接入其他物理引擎。
 
// game.add：对象工厂
// game.cache：缓存
// game. camera：照相机
// game.debug：调试工具
// game.device：设备
// game.input：输入
// game.load：加载器
// game.plugins：插件
// game.scale：缩放(适配)
// game.sound：音频
// game. stage：舞台
// game.state：场景
// game.time：定时器
// game.tweens：动画
// game.world：世界

// Phaser游戏中的精灵
// Image：game.add.image，可以旋转，缩放，裁剪，响应输入，但是没有物理属性和动画效果。
// Sprite：game.add.sprite，可以旋转，缩放，裁剪，有物理属性，可以响应输入，添加动画以及和相机之间交互。
// TileSprite：game.add.tileSprite，纹理平铺，主要用来做背景，背景滚动等。
// 调用原型：game.add.tileSprite(x, y, width, height, key)
// Button：game.add.button，按钮。
// 调用原型：game.add.button(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
// 最后四个参数分别是，hover时，鼠标在button外时，鼠标按下button时，鼠标抬起时的帧索引，例如：
// game.add.button(30, 300, 'replaybutton', this.onReplayClick, this, 0, 0, 1);
// 精灵定位，我们推荐尽量使用相对定位，比如：
// game.add.image(12, game.height - 16, 'copyright');
// 位于游戏区域底部，我们用game.height – 16，是相对于整个游戏进行定位。
// 飞机的拖动处理，十分简单，只需要两句代码：
// this.myplane.inputEnabled = true;
// this.myplane.input.enableDrag(false);
 
// 逐帧动画和渐变动画
// 逐帧动画的使用示例：
// this.myplane = game.add.sprite(100, 100, 'myplane');
// this.myplane.animations.add('fly');
// this.myplane.animations.play('fly', 12, true);
// 注意，这里我的飞机资源是下图

// 而且加载的时候，用的是spritesheet
// game.load.spritesheet('myplane', 'assets/myplane.png', 40, 40, 4);
// 所以在制作逐帧动画的时候就非常简单。
// 如果要让精灵停在某一帧，只需要设置它的frame，player.frame = 4;
// animations.add还有一些其他参数，可以参考文档`

// 渐变动画的使用示例：
// game.add.tween(this.myplane).to({y: game.height - 40}, 1000, Phaser.Easing.Sinusoidal.InOut, true);
// tween动画的本质，其实是用某一个函数去改变一个数值，先看文档：

// 物理引擎
// Arcade：最简单，只能进行矩形碰撞，效率最高
// Ninja：比Arcade好点，比P2差点
// P2：可以实现复杂碰撞，功能全面
// 这次我们先介绍Arcade：
// 首先，开启物理系统，game.physics.startSystem(Phaser.Physics.ARCADE);
// 然后，开启一个精灵的物理属性，game.physics.arcade.enable(this.myplane);
// 或者开启一个组的物理属性：
// this.mybullets = game.add.group();
// this.mybullets.enableBody = true;
// 最后，我们在update中进行碰撞检测：
// 只检测不进行碰撞
// game.physics.arcade.overlap(this.mybullets, this.enemy1.enemys, this.enemy1.hitEnemy, null, this.enemy1);
// 或者进行碰撞
// game.physics.arcade.collide(stars, platforms);
// 可以精灵与精灵碰，可以精灵与组碰，可以组与组碰，还可以组内碰撞。

// Group的使用
// 为什么要用组？在这个案例中，我们是为了方便我们的碰撞检测，更是为了使用对象池的思想进行资源的重复利用。
// 创建组，game.add.group();
// 批量设置组内元素属性：
// this.mybullets.setAll('outOfBoundsKill', true);
// this.mybullets.setAll('checkWorldBounds', true);
// 饿汉式：一次创建足够多的元素
// this.mybullets.createMultiple(50, 'mybullet');
// 懒汉式：用的时候从group中取，如果取不到，再新建一个，放入group


// 池的概念
// 在编程过程中，我们经常接触池的概念，比如线程池，连接池，对象池，都是池的思想，那么池到底是什么一种数据结构呢？
// 我们先来看一下原来我们是怎么使用对象的：

// 原来我们是简单粗暴的，用的时候，就new一个出来，用完了就扔掉，下次用，再new一个出来。这样有两个问题，第一，假如忘了扔，或者扔得不够彻底，会导致资源严重浪费；第二，每次用都要new，是一件麻烦事情。
// 而用了对象池，情况就不一样了。

// 我们在内存中维护一个池子，每次用的时候，从池子中拿一个出来用，用完之后放回去。这样做有几个好处，第一，内存中永远就那么几个对象，不会不停地new，第二，也不用每次用完再回收内存，只需要简单地放回池子。
// 至于它怎么优化性能，详见视频讲解。
 
// 在Phaser中通过Group实现对象池
// 饿汉式：一次创建足够多的元素
// this.mybullets.createMultiple(50, 'mybullet');
// 懒汉式：用的时候从group中取，如果取不到，再新建一个，放入group

// var enemy = this.groups["enemy"].getFirstExists(false);
// if(!enemy) {
//   enemy = new GameTank.Enemy(this, position, 'enemy', 'enemy', {
//     speed: (tankType == 1) ? 200 : 100,
//     award: award,
//     type: tankType
//   });
// } else {
//   enemy.rebirth(position, {
//     speed: (tankType == 1) ? 200 : 100,
//     award: award,
//     type: tankType
//   });
// }







//創建一個對象來存放需要用到的state類
//非必要，但是能組織關係
game.States = {}

//在存放類中添加狀態
game.States.state3 = function(){
	this.preload = function(){
		console.log(this);
	};
	this.create = function(){

	};
	this.update = function(){

	};
	this.otherMethod = function(){

	};
}

game.States.state4 = function(){
	this.preload = function(){
		console.log(this);
	};
	this.create = function(){

	};
	this.update = function(){

	};
	this.otherMethod = function(){

	};
}

//範例：加載進度條，用state實現
game.States.boot = function(){
    this.preload = function(){
        game.load.image('loading','assets/preloader.gif'); //加载进度条图片资源
    };
    this.create = function(){
        game.state.start('preload'); //加载完成后，调用preload场景
    };
}


// game.state.add('state3',game.States.state3);
// game.state.add('state4',game.States.state4);
// game.state.add('s0',state0);
//start state
//也有辦法在add時就直接start
//game.state.start('s0');

game.state.add('s2',state2);
game.state.start('s2');


function preload() {
}


function create() {
}


function update() {
	// ezText = game.add.text(
	// 	16,	//x座標
	// 	16,	//y座標
	// 	myDate.toLocaleTimeString(),	//文本內容
	// 	{fill: 'red'}	//文本樣式
	// )
}
