/**
 @constructor
 @abstract
 */
var Enemy = function () {
	if (this.constructor === Enemy) {
		throw new Error("Can't instantiate abstract class!");
	}
	// Animal initialization...

	//繼承精靈物件？
};

/**
 @abstract
 */
Enemy.prototype.attake = function () {
	throw new Error("Abstract method!");
}