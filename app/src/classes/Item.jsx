class Item {
    constructor(name, useEffect, isConsumable, price, quantity = 1) {
        this.name = name;
        this.useEffect = useEffect;  // The function to execute on use
        this.isConsumable = isConsumable;
        this.price = price;
        this.quantity = quantity;
    }

    use(target) {
        if (typeof this.useEffect === 'function') {
            this.useEffect(target);  // Ensure this is called correctly
        } else {
            throw new Error(`No effect available for ${this.name}`);
        }
    }
}

class Weapon extends Item {
    constructor(name, useEffect, weaponDmg, price, quantity = 1) {
        super(name, useEffect, false, price, quantity);
        this.weaponDmg = weaponDmg;
    }
}

class Armor extends Item {
    constructor(name, useEffect, armor, price, quantity = 1) {
        super(name, useEffect, false, price, quantity);
        this.armor = armor;
    }
}

export { Item, Weapon, Armor };

