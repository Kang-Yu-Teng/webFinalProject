var Chest = function (game, x, y, audioChest) {
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