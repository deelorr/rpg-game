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
        return `${this.name} picks up ${item.name}!`;
    }

    useItem(itemName, target) {
        let item = this.inventory.find(i => i.name === itemName);
        if (item) {
            item.use(target);
            if (item.isConsumable) {
                this.inventory = this.inventory.filter(i => i.name !== itemName);
            }
            return `${target.name} uses ${item.name}.`;
        } else {
            return `${itemName} not found in inventory.`;
        }
    }

    equip(item) {
        if (item.type === "weapon") {
            this.dmg += item.effect;
        } else if (item.type === "armor") {
            this.hp += item.effect;
        }
        return `${this.name} equips ${item.name}, ${item.type} bonus: ${item.effect}.`;
    }

    attack(target) {
        target.takeDmg(this.dmg);
        return `${this.name} attacks ${target.name} for ${this.dmg} damage.`;
    }

    takeDmg(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            return `${this.name} takes ${amount} damage and has been defeated.`;
        } else {
            return `${this.name} takes ${amount} damage. hp is now ${this.hp}.`;
        }
    }

    gainXP(amount) {
        this.xp += amount;
        if (this.xp >= this.level * 10) {
            this.levelUp();
        }
        return `${this.name} gains ${amount} xp.`;
    }

    levelUp() {
        this.level++;
        this.hp += 10;
        this.dmg += 5;
        this.xp = 0;
        return `${this.name} levels up to level ${this.level}! hp is now ${this.hp}, dmg is now ${this.dmg}.`;
    }
}

class Player extends Character {
    constructor(name, hp, dmg, special) {
        super(name, hp, dmg);
        this.special = special;
    }

    useSpecial(target) {
        target.takeDmg(this.dmg * 2);
        return `${this.name} uses ${this.special} and deals ${this.dmg * 2} damage to ${target.name}!`;
    }
}

class Enemy extends Character {
    constructor(name, hp, dmg, weakness) {
        super(name, hp, dmg);
        this.weakness = weakness;
    }

    showWeakness() {
        return `This enemy is weak to ${this.weakness}`;
    }
}

export { Player, Enemy, Equipment, Character };
