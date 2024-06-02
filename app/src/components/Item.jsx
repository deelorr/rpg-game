class Item {
    constructor(name, effect, isConsumable, price = 0, quantity) {
        this.name = name;
        this.effect = effect;
        this.isConsumable = isConsumable;
        this.price = price;
        this.quantity = quantity;
    }

    use(target) {
        this.effect(target);
    }
}

class Weapon extends Item {
    constructor(name, effect, weaponDmg, price, quantity) {
        super(name, effect, price);
        this.weaponDmg = weaponDmg;
        this.price = price;
        this.quantity = quantity;
    }
}

class Armor extends Item {
    constructor(name, effect, armor, price, quantity) {
        super(name, effect, price);
        this.armor = armor;
        this.price = price;
        this.quantity = quantity;
    }
}

export { Item, Weapon, Armor };
