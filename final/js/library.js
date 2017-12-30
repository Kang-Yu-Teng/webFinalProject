const SpawnBee = require("./spawnBee.js");
const SpawnSlug = require("./spawnSlug.js");
const SpawnPlant = require("./spawnPlant.js");
const SpawnChest = require("./spawnChest.js");
const SpawnEnemyDeath = require("./spawnEnemyDeath.js");

const PlayerNormalMove = require("./playerNormalMove.js")
const PlayerFastMove = require("./playerFastMove.js");
const BeeVerticalMove = require("./beeVerticalMove.js");
const BeeHorizontalMove = require("./beeHorizontalMove.js");

module.exports = class Library {
	constructor() {

		Library.spawn = function (target, method) {
			var choose = {
				bee: {
					normal: SpawnBee
				},
				slug: {
					normal: SpawnSlug
				},
				plant: {
					normal: SpawnPlant
				},
				chest: {
					normal: SpawnChest
				},
				EnemyDeath: {
					normal: SpawnEnemyDeath
				}
			};
			return choose[target][method];
		};
		Library.move = function (target, method) {
			var choose = {
				player: {
					normal: PlayerNormalMove,
					fast: PlayerFastMove
				}
				bee: {
					horizontal: ,
					vertical:
				}
			};
			return choose[target][method];
		};
	}
}