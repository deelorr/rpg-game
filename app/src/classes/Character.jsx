import { Weapon, Armor } from './Item';

class Character {
    constructor(name, hp, dmg) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
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
            return `${this.name} takes ${amount} damage. HP is now ${this.hp}.`;
        }
    }
}

class Player extends Character {
    constructor(name, hp, dmg, special) {
        super(name, hp, dmg);
        this.special = special;
        this.gold = 200;
        this.equippedWeapon = null;
        this.equippedArmor = null;
        this.inventory = [];
    }

    addItem(item) {
        if (item instanceof Weapon) {
            return this.equipWeapon(item);
        } else if (item instanceof Armor) {
            return this.equipArmor(item);
        } else {
            this.inventory.push(item);
            return `${item.name} added to inventory.`;
        }
    }

    equipWeapon(weapon) {
        this.dmg += weapon.weaponDmg;
        this.equippedWeapon = weapon;
        return `${this.equippedWeapon.name} equipped! Damage increased to ${this.dmg}.`;
    }

    equipArmor(armor) {
        this.hp += armor.armor;
        this.equippedArmor = armor;
        return `${this.equippedArmor.name} equipped! HP increased to ${this.hp}.`;
    }

    useSpecial(target) {
        target.takeDmg(this.dmg * 2);
        return `${this.name} uses ${this.special} and deals ${this.dmg * 2} damage to ${target.name}!`;
    }

    useItem(itemName, target) {
        const itemIndex = this.inventory.findIndex(i => i.name === itemName);
        if (itemIndex > -1) {
            const item = this.inventory[itemIndex];
            if (typeof item.use === 'function') {
                item.use(target);
                if (item.isConsumable) {
                    this.inventory.splice(itemIndex, 1); // Remove the used item from the inventory
                }
                return `${this.name} uses ${item.name} on ${target.name}.`;
            } else {
                throw new Error(`${item.name} has no use function.`);
            }
        } else {
            return `${itemName} not found in inventory.`;
        }
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

class NPC extends Character {
    constructor(name, hp, dmg) {
        super(name, hp, dmg);
    }

    talk() {
        return `Hello, my name is ${this.name}.`;
    }
}

export { Player, Enemy, Character, NPC };
