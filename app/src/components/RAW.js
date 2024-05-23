class Equipment {
    constructor(name, type, effect) {
        this.name = name;
        this.type = type;
        this.effect = effect;
    }
}

class Character {
    constructor(name, hp, dmg) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this.inventory = [];
        this.level = 1;
        this.xp = 0;
    }

    addItem(item) {
        this.inventory.push(item);
        console.log(`${this.name} picks up ${item.name}!`);
    }

    useItem(itemName, target) {
        let item = this.inventory.find(i => i.name === itemName);
        if (item) {
            item.use(target);
            if (item.isConsumable) {
                this.inventory = this.inventory.filter(i => i.name !== itemName);
            }
        } else {
            console.log(`${itemName} not found in inventory.`);
        }
    }

    equip(item) {
        if (item.type === "weapon") {
            this.dmg += item.effect;
        } else if (item.type === "armor") {
            this.hp += item.effect;
        }
        console.log(`${this.name} equips ${item.name}, ${item.type} bonus: ${item.effect}.`);
    }

    attack(target) {
        console.log(`${this.name} attacks ${target.name} for ${this.dmg} damage.`);
        target.takeDmg(this.dmg);
    }

    takeDmg(amount) {
        this.hp -= amount;
        console.log(`${this.name} takes ${amount} damage. hp is now ${this.hp}.`);
        if (this.hp <= 0) {
            console.log(`${this.name} has been defeated.`);
        }
    }

    gainXP(amount) {
        this.xp += amount;
        console.log(`${this.name} gains ${amount} xp.`);
        if (this.xp >= this.level * 10) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.hp += 10;
        this.dmg += 5;
        this.xp = 0;
        console.log(`${this.name} levels up to level ${this.level}! hp is now ${this.hp}, dmg is now ${this.dmg}.`);
    }
}

class Player extends Character {
    constructor(name, hp, dmg, special) {
        super(name, hp, dmg);
        this.special = special;
    }

    useSpecial(target) {
        console.log(`${this.name} uses ${this.special}!`);
        target.takeDmg(this.dmg * 2);
    }
}

class Enemy extends Character {
    constructor(name, hp, dmg, weakness) {
        super(name, hp, dmg);
        this.weakness = weakness;
    }

    showWeakness() {
        console.log(`This enemy is weak to ${this.weakness}`);
    }
}

class Item {
    constructor(name, effect, isConsumable = true) {
        this.name = name;
        this.effect = effect;
        this.isConsumable = isConsumable;
    }

    use(target) {
        console.log(`${target.name} uses ${this.name}.`);
        this.effect(target);
    }
}

class Game {
    static battle(player, enemy) {
        let turn = 0;
        while (player.hp > 0 && enemy.hp > 0) {
            if (turn % 2 === 0) {
                player.attack(enemy);
            } else {
                enemy.attack(player);
            }
            turn++;
        }
        console.log(player.hp > 0 ? `${player.name} wins!` : `${enemy.name} wins!`);
    }
}

// Create instances of Player, Enemy, Item, and Equipment
let Player1 = new Player("Ally", 150, 10, "Teleport Strike");
let Enemy1 = new Enemy("Matt", 100, 5, "Fire");
let Potion = new Item("Potion", function(target) {
    target.hp += 50;
    console.log(`${target.name} heals 50 hp. hp is now ${target.hp}.`);
}, true);
let Sword = new Equipment("Sword", "weapon", 5);
let Armor = new Equipment("Armor", "armor", 10);

// Interactions between Player, Enemy, Item, and Equipment
console.log(Player1);
Player1.attack(Enemy1);
Enemy1.attack(Player1);
Player1.useSpecial(Enemy1);
Enemy1.showWeakness();
Player1.addItem(Potion);
Player1.useItem("Potion", Player1);
Player1.addItem(Sword);
Player1.equip(Sword);
Player1.attack(Enemy1);
Player1.addItem(Armor);
Player1.equip(Armor);
Player1.takeDmg(20);
Game.battle(Player1, Enemy1);
if (Player1.hp > 0) {
    Player1.gainXP(10);
}
console.log(Player1);