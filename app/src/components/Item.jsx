class Item {
    constructor(name, effect, isConsumable = false) {
        this.name = name;
        this.effect = effect;
        this.isConsumable = isConsumable;
    }

    use(target) {
        this.effect(target);
    }
}

class Weapon extends Item {
    constructor(name, effect, weaponDmg) {
        super(name, effect);
        this.weaponDmg = weaponDmg;
    }
}

class Armor extends Item {
    constructor(name, effect, armor) {
        super(name, effect);
        this.armor = armor;
    }
}

export { Item, Weapon, Armor };
