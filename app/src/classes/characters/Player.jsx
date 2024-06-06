import Character from './Character';
import Weapon from '../items/weapons/Weapon';
import Armor from '../items/armor/Armor';

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

export default Player;