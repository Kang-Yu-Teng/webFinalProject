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
var hurtFlag = false;
var score = 0;

var collisionTiledID = [148 + 1];
var deadBlockID = [1 + 1];
var ladderTopID = [3 + 1];
var ladderID = [23 + 1];