// module.exports = 'globalVar';
var game;
var gameWidth = 320;
var gameHeight = 240;
var background;
var middleground;
var audioFlag = true;
var globalMap;
var player; //唯一一名的玩家
var enemies_group;
var chests_group;
var loot_group;
var carrots_group;
var stars_group;
var player_group;
var hurtFlag = false;
var score = 0;

//tiled內的id+1
var collisionTiledID = [149];
var deadBlockID = [2];
var ladderTopID = [4];
var ladderID = [24];
var exitZoneID = [673, 707];