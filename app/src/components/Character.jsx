import { Weapon, Armor } from './Item';

class Character {
    constructor(name, hp, dmg) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this.level = 1;
        this.xp = 0;
        this.inventory = [];
        this.equippedWeapon = null;
        this.equippedArmor = null;
    }

    addItem(item) {
        if (item instanceof Weapon) {
            this.dmg += item.weaponDmg;
            this.equippedWeapon = item;
            return `${this.equippedWeapon.name} equipped! Damage increased to ${this.dmg}.`;
        } else if (item instanceof Armor) {
            this.hp += item.armor;
            this.equippedArmor = item;
            return `${this.equippedArmor.name} equipped! HP increased to ${this.hp}.`;
        } else {
            this.inventory.push(item);
            return `${item.name} added to inventory.`;
        }
    }

    useItem(itemName, target) {
        const itemIndex = this.inventory.findIndex(i => i.name === itemName);
        if (itemIndex > -1) {
            const item = this.inventory[itemIndex];
            item.use(target);
            if (item.isConsumable) {
                this.inventory.splice(itemIndex, 1); // Remove the used item from the inventory
            }
            return `${target.name} uses ${item.name}.`;
        } else {
            return `${itemName} not found in inventory.`;
        }
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

    levelUp() {
        this.level++;
        this.hp += 10;
        this.dmg += 5;
        this.xp = 0;
        return `${this.name} levels up to level ${this.level}!`;
    }
}

class Player extends Character {
    constructor(name, hp, dmg, special) {
        super(name, hp, dmg);
        this.special = special;
        this.quests = [];
        this.gold = 100; // Initial gold for player
    }

    addQuest(quest) {
        this.quests.push(quest);
        return `${this.name} has received a new quest: ${quest.name}`;
    }

    completeQuest(questName) {
        const quest = this.quests.find(q => q.name === questName);
        if (quest && !quest.isComplete) {
            return quest.completeQuest(this);
        } else {
            return `Quest not found or already completed.`;
        }
    }

    gainXP(amount) {
        this.xp += amount;
        if (this.xp >= this.level * 10) {
            this.levelUp();
        }
        return `${this.name} gains ${amount} xp.`;
    }

    equip(item) {
        if (item instanceof Weapon) {
            this.dmg += item.weaponDmg;
            this.equippedWeapon = item;
            return `Equipped ${item.name}. Damage increased to ${this.dmg}.`;
        } else if (item instanceof Armor) {
            this.hp += item.armor;
            this.equippedArmor = item;
            return `Equipped ${item.name}. HP increased to ${this.hp}.`;
        } else {
            return `Cannot equip ${item.name}.`;
        }
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

export { Player, Enemy, Character };
