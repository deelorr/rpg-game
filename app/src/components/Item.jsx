class Item {
    constructor(name, effect, isConsumable, price = 0) {
        this.name = name;
        this.effect = effect;
        this.isConsumable = isConsumable;
        this.price = price;
    }

    use(target) {
        this.effect(target);
    }
}

class Weapon extends Item {
    constructor(name, effect, weaponDmg, price) {
        super(name, effect, price);
        this.weaponDmg = weaponDmg;
        this.price = price;
    }
}

class Armor extends Item {
    constructor(name, effect, armor, price) {
        super(name, effect, price);
        this.armor = armor;
        this.price = price;
    }
}

export { Item, Weapon, Armor };
