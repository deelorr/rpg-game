class Item {
    constructor(name, useEffect, isConsumable, price, stock) {
        this.name = name;
        this.useEffect = useEffect;  // The function to execute on use
        this.isConsumable = isConsumable;
        this.price = price;
        this.stock = stock;
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
    constructor(name, useEffect, weaponDmg, price, stock) {
        super(name, useEffect, false, price, stock);
        this.weaponDmg = weaponDmg;
    }
}

class Armor extends Item {
    constructor(name, useEffect, armor, price, stock) {
        super(name, useEffect, false, price, stock);
        this.armor = armor;
    }
}

export { Item, Weapon, Armor };
